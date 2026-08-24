import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("@emailjs/browser", () => ({
  default: {
    send: sendMock,
  },
}));

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.resetModules();
    sendMock.mockReset();
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "template_test");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "public_test");
  });

  it("sends the expected EmailJS template parameters", async () => {
    sendMock.mockResolvedValue({ status: 200 });
    const { sendContactEmail } = await import("./emailjsContact");

    await sendContactEmail({
      title: "Thumbnail Design Inquiry - Test User",
      name: "Test User",
      email: "test@example.com",
      message: "Service: Thumbnail Design",
    });

    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      {
        title: "Thumbnail Design Inquiry - Test User",
        name: "Test User",
        email: "test@example.com",
        message: "Service: Thumbnail Design",
      },
      "public_test"
    );
  });

  it("uses the contact name as the default title", async () => {
    sendMock.mockResolvedValue({ status: 200 });
    const { sendContactEmail } = await import("./emailjsContact");

    await sendContactEmail({
      name: "Test User",
      email: "test@example.com",
      message: "Homepage inquiry",
    });

    expect(sendMock.mock.calls[0][2].title).toBe("Test User");
  });

  it("fails before sending when EmailJS configuration is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "");
    const { sendContactEmail } = await import("./emailjsContact");

    await expect(
      sendContactEmail({
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
      })
    ).rejects.toThrow("EmailJS environment variables are not configured.");

    expect(sendMock).not.toHaveBeenCalled();
  });
});
