"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  HOMEPAGE_SECTIONS,
  PORTFOLIO_CATEGORIES,
} from "@/lib/mediaConstants";
import { sortDashboardMedia } from "@/lib/dashboardMediaSort";
import {
  getCloudinaryDashboardThumbnailUrl,
  getDashboardMediaPreviewUrl,
  getPublicVideoUrl,
  getVideoPreviewType,
  toVimeoEmbedUrl,
  toYouTubeEmbedUrl,
} from "@/lib/mediaUrl";
import { validateThumbnailFile } from "@/lib/thumbnailValidation";

const VIDEO_CATEGORIES = PORTFOLIO_CATEGORIES.filter(
  (category) => category !== "Thumbnails",
);

const INITIAL_FORM = {
  title: "",
  mediaType: "video",
  videoUrl: "",
  description: "",
  portfolioEnabled: true,
  portfolioCategory: VIDEO_CATEGORIES[0],
  portfolioOrder: 1,
  homepageEnabled: false,
  homepageSection: HOMEPAGE_SECTIONS[0],
  homepageCategory: "",
  homepageOrder: 1,
};

function formFromMedia(media) {
  return {
    title: media.title,
    mediaType: media.mediaType,
    videoUrl: media.videoUrl || "",
    description: media.description || "",
    portfolioEnabled: media.portfolio.enabled,
    portfolioCategory:
      media.portfolio.category ||
      (media.mediaType === "image" ? "Thumbnails" : VIDEO_CATEGORIES[0]),
    portfolioOrder: media.portfolio.order || 1,
    homepageEnabled: media.homepage.enabled,
    homepageSection: media.homepage.section || HOMEPAGE_SECTIONS[0],
    homepageCategory: media.homepage.category || "",
    homepageOrder: media.homepage.order || 1,
  };
}

function placementSummary(media) {
  const placements = [];

  if (media.portfolio.enabled) {
    placements.push(
      `${media.portfolio.category} · position ${media.portfolio.order}`,
    );
  }

  if (media.homepage.enabled) {
    placements.push(
      `Homepage ${media.homepage.section} · position ${media.homepage.order}`,
    );
  }

  return placements;
}

function AdminProjectPreview({
  imageUrl,
  isImageProject,
  title,
  videoUrl,
}) {
  if (isImageProject) {
    if (!imageUrl) {
      return (
        <p className="text-sm text-zinc-500">
          Select a thumbnail image to see its preview.
        </p>
      );
    }

    return (
      <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <Image
          alt={`${title || "Project"} thumbnail preview`}
          className="object-contain"
          fill
          sizes="392px"
          src={imageUrl}
          unoptimized
        />
      </div>
    );
  }

  const previewType = getVideoPreviewType(videoUrl);

  if (!previewType) {
    return (
      <p className="text-sm text-zinc-500">
        Enter a valid video URL to see its preview.
      </p>
    );
  }

  if (previewType === "youtube") {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-black">
        <iframe
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
          src={toYouTubeEmbedUrl(videoUrl)}
          title={`${title || "Project"} video preview`}
        />
      </div>
    );
  }

  if (previewType === "vimeo") {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-black">
        <iframe
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
          src={toVimeoEmbedUrl(videoUrl)}
          title={`${title || "Project"} video preview`}
        />
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-black">
      <video
        className="h-full w-full object-contain"
        controls
        preload="metadata"
        src={videoUrl}
      />
    </div>
  );
}

function ToastMessage({ message, onDismiss }) {
  if (!message) return null;

  const isError = message.type === "error";

  return (
    <div
      className={`fixed top-5 right-5 left-5 z-[60] flex max-w-md items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl sm:left-auto ${
        isError
          ? "border-red-700/70 bg-red-950 text-red-100"
          : "border-emerald-700/70 bg-emerald-950 text-emerald-100"
      }`}
      role={isError ? "alert" : "status"}
    >
      <p className="min-w-0 flex-1 text-sm leading-6">{message.text}</p>
      <button
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md px-1 text-lg leading-6 opacity-70 transition hover:opacity-100"
        onClick={onDismiss}
        type="button"
      >
        &times;
      </button>
    </div>
  );
}

function ConfirmationDialog({ confirmation, onCancel, onConfirm }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    function handleEscape(event) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  const isDelete = confirmation.action === "delete";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        aria-describedby="confirmation-description"
        aria-labelledby="confirmation-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl"
        role="dialog"
      >
        <h2 className="font-syne text-xl font-semibold" id="confirmation-title">
          {isDelete ? "Permanently delete project?" : "Archive project?"}
        </h2>
        <p
          className="mt-3 text-sm leading-6 text-zinc-400"
          id="confirmation-description"
        >
          {isDelete
            ? `“${confirmation.item.title}” and its stored thumbnail will be permanently deleted. This action cannot be undone.`
            : `“${confirmation.item.title}” will be removed from the website. You can restore it later from Archived projects.`}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            onClick={onCancel}
            ref={cancelButtonRef}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
              isDelete
                ? "bg-red-600 hover:bg-red-500"
                : "bg-amber-600 hover:bg-amber-500"
            }`}
            onClick={onConfirm}
            type="button"
          >
            {isDelete ? "Delete permanently" : "Archive project"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MediaDashboard({ initialMedia }) {
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);
  const thumbnailPreviewUrlRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [media, setMedia] = useState(initialMedia);
  const [activeStatus, setActiveStatus] = useState("active");
  const [editingMedia, setEditingMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mutatingId, setMutatingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [selectedThumbnailPreview, setSelectedThumbnailPreview] =
    useState(null);

  const isImageProject = form.mediaType === "image";

  useEffect(
    () => () => {
      if (thumbnailPreviewUrlRef.current) {
        URL.revokeObjectURL(thumbnailPreviewUrlRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!message) return undefined;

    const timeoutId = window.setTimeout(
      () => setMessage(null),
      message.type === "error" ? 7000 : 4500,
    );

    return () => window.clearTimeout(timeoutId);
  }, [message]);

  function clearSelectedThumbnailPreview() {
    if (thumbnailPreviewUrlRef.current) {
      URL.revokeObjectURL(thumbnailPreviewUrlRef.current);
      thumbnailPreviewUrlRef.current = null;
    }
    setSelectedThumbnailPreview(null);
  }

  function handleThumbnailChange(event) {
    const file = event.target.files?.[0] || null;
    clearSelectedThumbnailPreview();

    if (!file) return;

    const validation = validateThumbnailFile(file);
    if (!validation.valid) {
      event.target.value = "";
      setMessage({ type: "error", text: validation.message });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    thumbnailPreviewUrlRef.current = objectUrl;
    setSelectedThumbnailPreview(objectUrl);
    setMessage(null);
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function changeMediaType(mediaType) {
    setForm((current) => ({
      ...current,
      mediaType,
      videoUrl: mediaType === "image" ? "" : current.videoUrl,
      portfolioCategory:
        mediaType === "image" ? "Thumbnails" : VIDEO_CATEGORIES[0],
      homepageEnabled:
        mediaType === "image" ? false : current.homepageEnabled,
    }));
    setMessage(null);
  }

  function resetForm() {
    clearSelectedThumbnailPreview();
    setEditingMedia(null);
    setForm(INITIAL_FORM);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function beginEditing(item) {
    clearSelectedThumbnailPreview();
    setEditingMedia(item);
    setForm(formFromMedia(item));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMessage(null);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function loadMedia(status) {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/media?status=${status}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load projects.");
      }

      setMedia(result.media);
      setActiveStatus(status);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadSelectedThumbnail(file) {
    if (!file) return null;

    const validation = validateThumbnailFile(file);

    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const uploadData = new FormData();
    uploadData.append("file", file);

    const response = await fetch("/api/admin/thumbnails", {
      method: "POST",
      body: uploadData,
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unable to upload the thumbnail.");
    }

    return {
      url: result.thumbnail.url,
      publicId: result.thumbnail.publicId,
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const selectedFile = fileInputRef.current?.files?.[0] || null;

      if (isImageProject && !selectedFile && !editingMedia?.thumbnail) {
        throw new Error(
          "Select a JPG, JPEG, PNG, or WebP thumbnail image up to 10 MB.",
        );
      }

      const thumbnail = selectedFile
        ? await uploadSelectedThumbnail(selectedFile)
        : editingMedia?.thumbnail || null;
      const requestUrl = editingMedia
        ? `/api/admin/media/${editingMedia.id}`
        : "/api/admin/media";
      const response = await fetch(requestUrl, {
        method: editingMedia ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          mediaType: form.mediaType,
          videoUrl: isImageProject ? undefined : form.videoUrl,
          description: form.description || undefined,
          thumbnail,
          portfolio: {
            enabled: form.portfolioEnabled,
            category: form.portfolioEnabled
              ? isImageProject
                ? "Thumbnails"
                : form.portfolioCategory
              : null,
            order: form.portfolioEnabled
              ? Number(form.portfolioOrder)
              : null,
          },
          homepage: {
            enabled: form.homepageEnabled,
            section: form.homepageEnabled ? form.homepageSection : null,
            category: form.homepageEnabled
              ? form.homepageCategory || undefined
              : null,
            order: form.homepageEnabled ? Number(form.homepageOrder) : null,
          },
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to save the project.");
      }

      const action = editingMedia ? "updated" : "added";
      resetForm();
      await loadMedia("active");
      setMessage({
        type: "success",
        text: `“${result.media.title}” was ${action} successfully.`,
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function changeStatus(item, status) {
    setMutatingId(item.id);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/media/${item.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to change the project status.");
      }

      if (editingMedia?.id === item.id) resetForm();
      await loadMedia(activeStatus);
      setMessage({
        type: "success",
        text:
          status === "archived"
            ? `“${item.title}” was archived.`
            : `“${item.title}” was restored.`,
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setMutatingId(null);
    }
  }

  async function permanentlyDelete(item) {
    setMutatingId(item.id);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/media/${item.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to delete the project.");
      }

      await loadMedia("archived");
      setMessage({
        type: "success",
        text: `“${item.title}” was permanently deleted.`,
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setMutatingId(null);
    }
  }

  function requestConfirmation(action, item) {
    setMessage(null);
    setConfirmation({ action, item });
  }

  async function confirmPendingAction() {
    const pendingConfirmation = confirmation;
    if (!pendingConfirmation) return;

    setConfirmation(null);

    if (pendingConfirmation.action === "archive") {
      await changeStatus(pendingConfirmation.item, "archived");
      return;
    }

    await permanentlyDelete(pendingConfirmation.item);
  }

  return (
    <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
      <ToastMessage message={message} onDismiss={() => setMessage(null)} />
      {confirmation ? (
        <ConfirmationDialog
          confirmation={confirmation}
          onCancel={() => setConfirmation(null)}
          onConfirm={confirmPendingAction}
        />
      ) : null}
      <section
        className="h-fit scroll-mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
        ref={formSectionRef}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-syne text-2xl font-semibold">
            {editingMedia ? "Edit project" : "Add project"}
          </h2>
          {editingMedia ? (
            <button
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={resetForm}
              type="button"
            >
              Cancel
            </button>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {editingMedia
            ? "Update its details, placements, or exact positions."
            : "Add one project and choose exactly where it should appear."}
        </p>

        <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-sm font-medium text-zinc-200">
              Project type
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["video", "Video"],
                ["image", "Thumbnail"],
              ].map(([value, label]) => (
                <label
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${
                    form.mediaType === value
                      ? "border-sky-500 bg-sky-500/10 text-sky-300"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-600"
                  }`}
                  key={value}
                >
                  <input
                    checked={form.mediaType === value}
                    className="sr-only"
                    name="mediaType"
                    onChange={() => changeMediaType(value)}
                    type="radio"
                    value={value}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="title">
              Title
            </label>
            <input
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-sky-500"
              id="title"
              maxLength={200}
              onChange={(event) => updateField("title", event.target.value)}
              required
              value={form.title}
            />
          </div>

          {!isImageProject ? (
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="videoUrl"
              >
                Video URL
              </label>
              <input
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-sky-500"
                id="videoUrl"
                onChange={(event) =>
                  updateField("videoUrl", event.target.value)
                }
                placeholder="https://youtu.be/..."
                required
                type="url"
                value={form.videoUrl}
              />
            </div>
          ) : null}

          <div>
            <label
              className="mb-2 block text-sm font-medium"
              htmlFor="description"
            >
              Description <span className="text-zinc-500">(optional)</span>
            </label>
            <textarea
              className="min-h-24 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-sky-500"
              id="description"
              maxLength={500}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              value={form.description}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="image">
              {isImageProject
                ? "Thumbnail image"
                : "Preview thumbnail (optional)"}
            </label>
            <input
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:font-medium file:text-black"
              id="image"
              onChange={handleThumbnailChange}
              ref={fileInputRef}
              required={isImageProject && !editingMedia?.thumbnail}
              type="file"
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              JPG, JPEG, PNG or WebP. Maximum size: 10 MB.
            </p>
            {editingMedia?.thumbnail ? (
              <p className="mt-1 text-xs text-sky-300">
                Leave empty to keep the current thumbnail.
              </p>
            ) : null}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Project preview</p>
            <AdminProjectPreview
              imageUrl={
                selectedThumbnailPreview ||
                (editingMedia?.thumbnail?.url
                  ? getCloudinaryDashboardThumbnailUrl(
                      editingMedia.thumbnail.url,
                    )
                  : null)
              }
              isImageProject={isImageProject}
              title={form.title}
              videoUrl={form.videoUrl}
            />
          </div>

          <fieldset className="rounded-xl border border-zinc-800 p-4">
            <label className="flex items-center gap-3 font-medium">
              <input
                checked={form.portfolioEnabled}
                className="h-4 w-4 accent-sky-500"
                onChange={(event) =>
                  updateField("portfolioEnabled", event.target.checked)
                }
                type="checkbox"
              />
              Show in portfolio
            </label>

            {form.portfolioEnabled ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_110px]">
                <div>
                  <label
                    className="mb-2 block text-sm text-zinc-400"
                    htmlFor="portfolioCategory"
                  >
                    Category
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3"
                    disabled={isImageProject}
                    id="portfolioCategory"
                    onChange={(event) =>
                      updateField("portfolioCategory", event.target.value)
                    }
                    value={form.portfolioCategory}
                  >
                    {(isImageProject ? ["Thumbnails"] : VIDEO_CATEGORIES).map(
                      (category) => (
                        <option key={category}>{category}</option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm text-zinc-400"
                    htmlFor="portfolioOrder"
                  >
                    Position
                  </label>
                  <input
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3"
                    id="portfolioOrder"
                    min="1"
                    onChange={(event) =>
                      updateField("portfolioOrder", event.target.value)
                    }
                    required
                    type="number"
                    value={form.portfolioOrder}
                  />
                </div>
              </div>
            ) : null}
          </fieldset>

          {!isImageProject ? (
            <fieldset className="rounded-xl border border-zinc-800 p-4">
              <label className="flex items-center gap-3 font-medium">
                <input
                  checked={form.homepageEnabled}
                  className="h-4 w-4 accent-sky-500"
                  onChange={(event) =>
                    updateField("homepageEnabled", event.target.checked)
                  }
                  type="checkbox"
                />
                Show on homepage
              </label>

              {form.homepageEnabled ? (
                <div className="mt-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-[1fr_110px]">
                    <div>
                      <label
                        className="mb-2 block text-sm text-zinc-400"
                        htmlFor="homepageSection"
                      >
                        Homepage row
                      </label>
                      <select
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3"
                        id="homepageSection"
                        onChange={(event) =>
                          updateField("homepageSection", event.target.value)
                        }
                        value={form.homepageSection}
                      >
                        <option value="landscape">Landscape videos</option>
                        <option value="reel">Vertical reels</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="mb-2 block text-sm text-zinc-400"
                        htmlFor="homepageOrder"
                      >
                        Position
                      </label>
                      <input
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3"
                        id="homepageOrder"
                        min="1"
                        onChange={(event) =>
                          updateField("homepageOrder", event.target.value)
                        }
                        required
                        type="number"
                        value={form.homepageOrder}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm text-zinc-400"
                      htmlFor="homepageCategory"
                    >
                      Display category <span className="text-zinc-600">(optional)</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3"
                      id="homepageCategory"
                      maxLength={80}
                      onChange={(event) =>
                        updateField("homepageCategory", event.target.value)
                      }
                      value={form.homepageCategory}
                    />
                  </div>
                </div>
              ) : null}
            </fieldset>
          ) : null}

          {!form.portfolioEnabled && !form.homepageEnabled ? (
            <p className="text-sm text-amber-300">
              Select at least one website placement.
            </p>
          ) : null}

          <button
            className="w-full rounded-xl bg-sky-500 px-5 py-3 font-semibold text-black transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={
              isSubmitting ||
              (!form.portfolioEnabled && !form.homepageEnabled)
            }
            type="submit"
          >
            {isSubmitting
              ? "Saving project..."
              : editingMedia
                ? "Save changes"
                : "Add project"}
          </button>
        </form>
      </section>

      <section className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-syne text-2xl font-semibold">Projects</h2>
            <p className="mt-1 text-sm text-zinc-500">
              {media.length} {activeStatus} project{media.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex rounded-xl border border-zinc-800 bg-zinc-950 p-1">
            {["active", "archived"].map((status) => (
              <button
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                  activeStatus === status
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                disabled={isLoading}
                key={status}
                onClick={() => loadMedia(status)}
                type="button"
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="mt-8 text-zinc-400">Loading projects...</p>
        ) : media.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-zinc-700 px-6 py-12 text-center text-zinc-500">
            No {activeStatus} projects yet.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {sortDashboardMedia(media).map((item) => {
              const previewUrl = getDashboardMediaPreviewUrl({
                thumbnailUrl: item.thumbnail?.url,
                videoUrl: item.videoUrl,
              });

              return (
                <article
                  className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 sm:flex-row"
                  key={item.id}
                >
                  {previewUrl ? (
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:w-40">
                      <Image
                        alt={`${item.title} preview`}
                        className="object-cover"
                        fill
                        loading="lazy"
                        sizes="160px"
                        src={previewUrl}
                        unoptimized
                      />
                      {item.mediaType === "video" ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-sm text-white">
                            &#9654;
                          </span>
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex aspect-video w-full shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs uppercase tracking-wider text-zinc-600 sm:w-40">
                      {item.mediaType}
                    </div>
                  )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-semibold text-zinc-100">{item.title}</h3>
                    <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs capitalize text-zinc-400">
                      {item.mediaType}
                    </span>
                  </div>
                  {item.description ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                      {item.description}
                    </p>
                  ) : null}
                  <ul className="mt-3 space-y-1 text-xs text-sky-300">
                    {placementSummary(item).map((placement) => (
                      <li key={placement}>{placement}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.videoUrl ? (
                      <a
                        className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-sky-500 hover:text-sky-300"
                        href={getPublicVideoUrl(item.videoUrl)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Open video
                      </a>
                    ) : null}
                    {item.status === "active" ? (
                      <>
                        <button
                          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-sky-500 hover:text-sky-300"
                          disabled={mutatingId === item.id}
                          onClick={() => beginEditing(item)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-amber-600 hover:text-amber-300 disabled:opacity-50"
                          disabled={mutatingId === item.id}
                          onClick={() => requestConfirmation("archive", item)}
                          type="button"
                        >
                          {mutatingId === item.id ? "Archiving..." : "Archive"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-emerald-600 hover:text-emerald-300 disabled:opacity-50"
                          disabled={mutatingId === item.id}
                          onClick={() => changeStatus(item, "active")}
                          type="button"
                        >
                          {mutatingId === item.id ? "Working..." : "Restore"}
                        </button>
                        <button
                          className="rounded-lg border border-red-950 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:border-red-700 hover:text-red-300 disabled:opacity-50"
                          disabled={mutatingId === item.id}
                          onClick={() => requestConfirmation("delete", item)}
                          type="button"
                        >
                          {mutatingId === item.id
                            ? "Working..."
                            : "Delete permanently"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
