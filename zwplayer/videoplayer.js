import "./modulepreload-polyfill-B5Qt9EMX.js";
const V = "zw_lang";
let b = "en";
if (typeof window < "u" && window.__LANG__)
    b = window.__LANG__;
else if (typeof location < "u" && location.pathname.indexOf("/zh/") !== -1)
    b = "zh";
else if (typeof location < "u" && location.pathname.indexOf("/tools/") !== -1)
    b = "en";
else
    try {
        const t = localStorage.getItem(V);
        t === "zh" || t === "en" ? b = t : (navigator.language || "").startsWith("zh") && (b = "zh")
    } catch {}
const Y = {
    "header.title": "全能视频播放器",
    "url.placeholderRemote": "输入视频 URL (http/https/webrtc/rtsp)...",
    "btn.play": "播放",
    "btn.loadFile": "文件",
    "tab.home": "首页",
    "tab.input": "输入",
    "tab.playlist": "历史",
    "tab.favorites": "收藏",
    "tab.explore": "文档",
    "tab.apps": "应用",
    "playlist.empty": "暂无历史记录。",
    "favorites.empty": "暂无收藏。",
    "app.annotation.title": "交互标注编辑器",
    "app.annotation.desc": "为当前视频叠加可点击的交互区域，增强互动体验。",
    "app.subtitle.title": "外挂字幕编辑器",
    "app.subtitle.desc": "直接在浏览器中编辑和预览字幕，支持实时效果。",
    "app.chapter.title": "视频章节编辑器",
    "app.chapter.desc": "为长视频添加带时间戳的章节，方便观众快速定位。",
    "app.thumbnail.title": "视频缩图生成器",
    "app.thumbnail.desc": "为视频生成网格缩略图预览，一目了然。",
    "app.playlistGen.title": "播放列表生成器",
    "app.playlistGen.desc": "为视频创建结构化的播放列表文件，支持 JSON 格式。",
    "app.generator.title": "在线配置生成器",
    "app.generator.desc": "可视化配置播放器各项属性，实时预览效果，并一键生成前端接入代码。",
    "app.watermark.title": "水印编辑器",
    "app.watermark.desc": "为视频添加图片或文字水印，支持 Logo 叠加与防录屏保护。",
    "form.live": "直播",
    "form.fav": "收藏",
    "form.cancel": "取消",
    "form.ok": "确定",
    "form.editTitle": "编辑",
    "form.editTip": "请输入新的标题",
    "form.titleLabel": "标题",
    "form.urlLabel": "链接",
    "form.urlTip": "请输入视频链接",
    "form.nocollent": "链接为空或为本地文件，无法收藏",
    "form.invalidUrl": "暂不支持该链接协议",
    "form.initFail": "播放器初始化失败，请刷新页面重试",
    "collect.success": "收藏成功",
    "collect.exists": "该链接已在收藏中",
    "btn.share": "分享",
    "table.share": "分享",
    "form.noshare": "无法分享空地址或本地文件",
    "share.title": "分享视频",
    "share.scanTip": "扫码在手机上打开",
    "share.urlLabel": "分享链接",
    "share.copy": "复制链接",
    "share.copied": "链接已复制",
    "share.qrError": "二维码生成失败，请直接复制链接",
    "share.close": "关闭",
    "table.date": "日期",
    "table.title": "标题",
    "table.url": "链接",
    "table.liveShort": "直播",
    "table.op": "操作",
    "table.play": "播放",
    "table.delete": "删除",
    "table.editTitle": "编辑标题",
    "table.copy": "复制链接",
    "table.edit": "编辑",
    "table.fav": "收藏",
    "table.deleteAll": "清空",
    "table.subtitle": "字幕",
    "table.yes": "是",
    "table.no": "否",
    "table.sameUrlKeep": "注：相同链接只保留最近一次记录；本地文件刷新后即失效。",
    "table.autoSave": "自动保存",
    "collect.tip": "注：相同链接只保留最近一次收藏记录。"
}
  , X = {
    "header.title": "Universal Video Player",
    "url.placeholderRemote": "Enter video URL (http/https/webrtc/rtsp)...",
    "btn.play": "Play",
    "btn.loadFile": "File",
    "tab.home": "Home",
    "tab.input": "Input",
    "tab.playlist": "History",
    "tab.favorites": "Favorites",
    "tab.explore": "Docs",
    "tab.apps": "Apps",
    "playlist.empty": "No play history.",
    "favorites.empty": "No bookmarks yet.",
    "app.annotation.title": "Interactive Annotation Editor",
    "app.annotation.desc": "Overlay clickable interactive regions on the current video to enhance engagement.",
    "app.subtitle.title": "External Subtitle Editor",
    "app.subtitle.desc": "Edit and preview subtitles directly in your browser with real-time effects.",
    "app.chapter.title": "Video Chapter Editor",
    "app.chapter.desc": "Add timestamped chapters to long videos for quick navigation.",
    "app.thumbnail.title": "Video Thumbnail Generator",
    "app.thumbnail.desc": "Generate a grid of thumbnail previews for the video.",
    "app.playlistGen.title": "Media Playlist Generator",
    "app.playlistGen.desc": "Create structured playlist files for videos, supporting JSON format.",
    "app.generator.title": "Online Config Generator",
    "app.generator.desc": "Visually configure player properties, preview in real-time, and instantly generate frontend integration code.",
    "app.watermark.title": "Watermark Editor",
    "app.watermark.desc": "Add image or text watermarks to videos with Logo overlay and anti-screen-recording protection.",
    "form.live": "Live",
    "form.fav": "Favorite",
    "form.cancel": "Cancel",
    "form.ok": "OK",
    "form.editTitle": "Edit",
    "form.editTip": "Enter a new title",
    "form.titleLabel": "Title",
    "form.urlLabel": "URL",
    "form.urlTip": "Enter the video URL",
    "form.nocollent": "URL is empty or is a local file, cannot bookmark",
    "form.invalidUrl": "Unsupported URL protocol",
    "form.initFail": "Player failed to load. Please refresh and try again.",
    "collect.success": "Added to favorites",
    "collect.exists": "This URL is already in favorites",
    "btn.share": "Share",
    "table.share": "Share",
    "form.noshare": "Cannot share empty or local file URL",
    "share.title": "Share Video",
    "share.scanTip": "Scan to open on your phone",
    "share.urlLabel": "Share Link",
    "share.copy": "Copy Link",
    "share.copied": "Link copied",
    "share.qrError": "QR code failed, please copy the link",
    "share.close": "Close",
    "table.date": "Date",
    "table.title": "Title",
    "table.url": "URL",
    "table.liveShort": "Live",
    "table.op": "Action",
    "table.play": "Play",
    "table.delete": "Delete",
    "table.editTitle": "Edit Title",
    "table.copy": "Copy URL",
    "table.edit": "Edit",
    "table.fav": "Favorite",
    "table.deleteAll": "Clear",
    "table.subtitle": "Subtitle",
    "table.yes": "Yes",
    "table.no": "No",
    "table.sameUrlKeep": "Note: only the latest record of the same URL is kept; local files are invalidated after a refresh.",
    "table.autoSave": "Auto Save",
    "collect.tip": "Note: only the latest favorite of the same URL is kept."
}
  , I = {
    zh: Y,
    en: X
}
  , ee = [];
function d(t) {
    const e = I[b] || I.en;
    return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : Object.prototype.hasOwnProperty.call(I.en, t) ? I.en[t] : t
}
function te(t) {
    if (!(t !== "zh" && t !== "en")) {
        var e = b;
        b = t;
        try {
            localStorage.setItem(V, t)
        } catch {}
        e !== t && ee.forEach(function(a) {
            a(t)
        })
    }
}
function E() {
    return b
}
function F() {
    const t = E();
    document.querySelectorAll("[data-i18n]").forEach(e => {
        e.innerHTML = d(e.dataset.i18n)
    }
    ),
    document.querySelectorAll("[data-i18n-placeholder]").forEach(e => {
        e.placeholder = d(e.dataset.i18nPlaceholder || e.getAttribute("data-i18n-placeholder"))
    }
    ),
    document.querySelectorAll("[data-lang-only]").forEach(e => {
        e.style.display = e.dataset.langOnly === t ? "" : "none"
    }
    ),
    document.querySelectorAll(".app-card").forEach(e => {
        var a = e.getAttribute("data-href-base");
        a || (a = e.getAttribute("href"),
        e.setAttribute("data-href-base", a)),
        e.setAttribute("href", t === "zh" ? "/zh" + a : a)
    }
    )
}
function ae(t) {
    var e = location.pathname;
    if (t === "zh") {
        if (e.indexOf("/zh/") === -1)
            return "/zh" + e + location.search + location.hash
    } else if (e.indexOf("/zh/") !== -1)
        return e.replace(/^\/zh\//, "/") + location.search + location.hash;
    return e
}
function q(t) {
    return String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}
function B(t) {
    const e = String(t).split("#")[0].split("?")[0];
    return e.split("/").pop().replace(/\.[a-zA-Z0-9_-]+$/, "") || e.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "") || String(t)
}
const oe = ["http:", "https:", "ws:", "wss:", "rtsp:", "webrtc:", "blob:"];
function N(t) {
    if (!t)
        return !1;
    try {
        return oe.includes(new URL(t,location.href).protocol.toLowerCase())
    } catch {
        return !1
    }
}
function ne(t) {
    if (typeof t != "number" || !isFinite(t) || t < 0)
        return "";
    const e = Math.floor(t)
      , a = Math.floor(e / 3600)
      , o = Math.floor(e % 3600 / 60)
      , n = e % 60
      , i = r => String(r).padStart(2, "0");
    return a > 0 ? `${a}:${i(o)}:${i(n)}` : `${o}:${i(n)}`
}
function g(t) {
    const e = document.createElement("div");
    e.className = "toast",
    e.textContent = t,
    e.setAttribute("role", "status"),
    e.setAttribute("aria-live", "polite"),
    (document.querySelector("dialog[open]") || document.body).appendChild(e),
    setTimeout( () => {
        e.style.opacity = "0",
        setTimeout( () => e.remove(), 300)
    }
    , 2e3)
}
async function j(t) {
    if (navigator.clipboard && window.isSecureContext)
        try {
            return await navigator.clipboard.writeText(t),
            !0
        } catch (e) {
            console.warn("navigator.clipboard failed, falling back to execCommand:", e)
        }
    try {
        const e = document.createElement("textarea");
        e.value = t,
        e.style.position = "fixed",
        e.style.left = "-9999px",
        e.style.top = "-9999px",
        e.style.opacity = "0",
        document.body.appendChild(e),
        e.focus(),
        e.select();
        const a = document.execCommand("copy");
        return e.remove(),
        a
    } catch (e) {
        return console.error("copyToClipboard failed:", e),
        !1
    }
}
const x = {
    history: "zw_play_history",
    favs: "zw_collect_list"
};
function G(t, e, a) {
    const o = new URLSearchParams;
    return o.set("url", t),
    e && o.set("live", "1"),
    a && o.set("title", a),
    o.toString()
}
function ie(t, e, a) {
    return location.origin + location.pathname + "?" + G(t, e, a)
}
function P(t, e, a) {
    if (!t || String(t).startsWith("blob:")) {
        history.replaceState(null, "", location.pathname);
        return
    }
    history.replaceState(null, "", location.pathname + "?" + G(t, e, a))
}
function re() {
    const t = new URLSearchParams(location.search)
      , e = (t.get("url") || "").trim();
    return !e || e.startsWith("blob:") || !N(e) ? null : {
        url: e,
        isLive: t.get("live") === "1",
        title: (t.get("title") || "").trim()
    }
}
function se() {
    const t = re();
    if (!t)
        return null;
    const e = document.getElementById("videoUrlInput")
      , a = document.getElementById("chkLive")
      , o = document.getElementById("btnClearUrl");
    return e && (e.value = t.url),
    a && (a.checked = t.isLive),
    o && o.classList.toggle("visible", !!t.url.trim()),
    t
}
function le(t, e) {
    if (!t || !window.qrcode)
        return !1;
    try {
        const a = window.qrcode(0, "L");
        a.addData(e),
        a.make();
        const o = a.getModuleCount()
          , n = 4
          , i = o + n * 2
          , r = Math.max(2, Math.floor(220 / i))
          , c = i * r;
        t.width = c,
        t.height = c;
        const l = t.getContext("2d");
        l.fillStyle = "#ffffff",
        l.fillRect(0, 0, c, c),
        l.fillStyle = "#000000";
        for (let s = 0; s < o; s++)
            for (let f = 0; f < o; f++)
                a.isDark(s, f) && l.fillRect((f + n) * r, (s + n) * r, r, r);
        return !0
    } catch (a) {
        return console.error("renderQr failed:", a),
        !1
    }
}
function Z(t, e, a) {
    if (!t || String(t).startsWith("blob:")) {
        g(d("form.noshare"));
        return
    }
    const o = document.getElementById("shareDialog")
      , n = document.getElementById("shareUrlInput")
      , i = document.getElementById("shareQr")
      , r = document.getElementById("shareQrError");
    if (!o || !n)
        return;
    const c = ie(t, e, a);
    n.value = c;
    const l = le(i, c);
    i && (i.style.display = l ? "" : "none"),
    r && (r.style.display = l ? "none" : ""),
    o.showModal()
}
function ce() {
    const t = document.getElementById("shareDialog");
    if (!t)
        return;
    const e = document.getElementById("shareCloseX")
      , a = document.getElementById("btnCloseShare")
      , o = document.getElementById("btnCopyShare")
      , n = document.getElementById("shareUrlInput")
      , i = () => {
        t.open && t.close()
    }
    ;
    e && e.addEventListener("click", i),
    a && a.addEventListener("click", i),
    o && o.addEventListener("click", async () => {
        n && n.value && await j(n.value) && g(d("share.copied"))
    }
    )
}
function de() {
    const t = document.getElementById("btnShare");
    t && t.addEventListener("click", () => {
        const e = document.getElementById("videoUrlInput").value.trim();
        if (!e || String(e).startsWith("blob:")) {
            g(d("form.noshare"));
            return
        }
        const a = document.getElementById("chkLive").checked;
        Z(e, a, B(e))
    }
    )
}
let u = null
  , p = []
  , h = []
  , S = !0
  , R = 0
  , A = null;
document.addEventListener("DOMContentLoaded", () => {
    fe(),
    pe(),
    me(),
    ve(),
    Pe(),
    ue();
    const t = se()
      , e = t ? p.find(o => o.url === t.url) : null
      , a = t && !t.isLive && e && typeof e.position == "number" ? e.position : void 0;
    if (_(t ? t.url : void 0, t ? t.isLive : void 0, a !== void 0 ? {
        resumePosition: a
    } : void 0),
    t) {
        const o = t.title || B(t.url);
        k(t.url, o, t.isLive, e && e.subtitle, e && e.position, e && e.duration),
        P(t.url, t.isLive, o)
    }
    we(),
    ce(),
    de(),
    _e(),
    w(),
    document.addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && O()
    }
    ),
    window.addEventListener("pagehide", O)
}
);
function ue() {
    document.addEventListener("gesturestart", t => t.preventDefault()),
    document.addEventListener("gesturechange", t => t.preventDefault())
}
function z() {
    const t = document.getElementById("logoLink");
    t && (t.href = E() === "zh" ? "/zh/" : "")
}
function fe() {
    const t = document.querySelector(".lang-switch .lang-link");
    t && t.addEventListener("click", e => {
        e.preventDefault();
        const o = E() === "zh" ? "en" : "zh"
          , n = ae(o);
        if (n !== location.pathname) {
            location.href = n;
            return
        }
        te(o),
        t.textContent = o === "zh" ? "EN" : "中文",
        F(),
        z(),
        w()
    }
    ),
    z(),
    F()
}
function C() {
    if (!window.matchMedia("(max-width: 768px)").matches)
        return;
    document.querySelectorAll(".landing-content").forEach(o => o.classList.remove("mobile-visible"));
    const e = document.querySelector(".sidebar-body");
    e && e.classList.remove("mobile-visible");
    const a = document.getElementById("mobileBackdrop");
    a && a.classList.remove("visible"),
    document.querySelectorAll(".sidebar-tab").forEach(o => o.classList.remove("active"))
}
function pe() {
    const t = document.querySelectorAll(".sidebar-tab")
      , e = {
        input: document.getElementById("inputPanel"),
        playlist: document.getElementById("playlistPanel"),
        favorites: document.getElementById("favoritesPanel")
    }
      , a = document.querySelectorAll(".landing-content")
      , o = document.querySelector(".sidebar-body")
      , n = document.getElementById("mobileBackdrop")
      , i = () => window.matchMedia("(max-width: 768px)").matches;
    n && n.addEventListener("click", C),
    t.forEach(l => {
        const s = l.dataset.tab;
        !i() && (s === "home" || s === "explore") || l.addEventListener("click", () => {
            if (i()) {
                if (l.classList.contains("active")) {
                    C(),
                    r("home");
                    return
                }
                if (C(),
                r(s),
                s === "home")
                    return;
                n && n.classList.add("visible"),
                s === "explore" ? a.forEach(f => f.classList.add("mobile-visible")) : (o && o.classList.add("mobile-visible"),
                c(s))
            } else
                r(s),
                o && (o.style.display = ""),
                c(s)
        }
        )
    }
    );
    function r(l) {
        t.forEach(s => s.classList.toggle("active", s.dataset.tab === l))
    }
    function c(l) {
        Object.keys(e).forEach(s => {
            e[s] && (e[s].style.display = s === l ? "block" : "none")
        }
        )
    }
    document.querySelectorAll(".app-card")
}
function me() {
    try {
        p = JSON.parse(localStorage.getItem(x.history) || "[]"),
        h = JSON.parse(localStorage.getItem(x.favs) || "[]")
    } catch {
        p = [],
        h = []
    }
    p = p.filter(t => !String(t.url).startsWith("blob:")),
    p.forEach(t => {
        Array.isArray(t.subtitle) && (t.subtitle = t.subtitle.filter(e => !String(e.bloburl || "").startsWith("blob:")))
    }
    ),
    v()
}
function v() {
    try {
        localStorage.setItem(x.history, JSON.stringify(p)),
        localStorage.setItem(x.favs, JSON.stringify(h))
    } catch (t) {
        console.warn("localStorage unavailable; history/favorites not persisted:", t)
    }
}
function k(t, e, a, o, n, i) {
    if (!S)
        return;
    p = p.filter(l => l.url !== t);
    const c = {
        date: new Date().toLocaleDateString(E() === "zh" ? "zh-CN" : "en-US"),
        title: e,
        url: t,
        islive: a,
        subtitle: o || []
    };
    typeof n == "number" && n >= 0 && (c.position = n),
    typeof i == "number" && i > 0 && (c.duration = i),
    p.unshift(c),
    p.length > 50 && p.pop(),
    v(),
    w()
}
function M(t, e, a) {
    if (!t)
        return;
    const o = p.find(n => n.url === t);
    o && (typeof e == "number" && e >= 0 && (o.position = e),
    typeof a == "number" && a > 0 && (o.duration = a),
    v())
}
function O() {
    const t = u && u._config && u._config.url;
    if (!t || String(t).startsWith("blob:"))
        return;
    const e = u && u.videoEl;
    if (!e)
        return;
    const a = e.currentTime
      , o = e.duration;
    typeof a != "number" || typeof o != "number" || M(t, e.ended ? 0 : a, o)
}
const he = 5
  , ge = 5;
function ye(t) {
    if (typeof t != "number" || t < he)
        return;
    const e = u && u.videoEl && u.videoEl.duration;
    if (typeof e == "number" && isFinite(e) && e - t < ge)
        return;
    const a = () => {
        const n = u && u.videoEl;
        return !!n && Math.abs(n.currentTime - t) <= .5
    }
      , o = n => {
        const i = u
          , r = i && i.videoEl;
        if (r) {
            if (typeof i.seekTime == "function" && i.seekTime(t),
            !a())
                try {
                    r.currentTime = t
                } catch {}
            a() || n <= 0 || (r.addEventListener("loadedmetadata", () => {
                if (!a())
                    try {
                        r.currentTime = t
                    } catch {}
            }
            , {
                once: !0
            }),
            setTimeout( () => o(n - 1), 300))
        }
    }
    ;
    requestAnimationFrame( () => {
        if (!u)
            return;
        o(4);
        const n = (d("history.resumed") || "Resumed from {time}").replace("{time}", ne(t));
        g(n)
    }
    )
}
function J(t, e, a) {
    h = h.filter(n => n.url !== t);
    const o = new Date().toLocaleDateString(E() === "zh" ? "zh-CN" : "en-US");
    h.unshift({
        date: o,
        title: e,
        url: t,
        islive: a
    }),
    v(),
    w()
}
function Q(t) {
    return h.some(e => e.url === t)
}
const be = [".mp3", ".flac", ".m4a", ".aac", ".ogg", ".wav", ".opus"];
function K(t) {
    if (!t || typeof t != "string")
        return !1;
    const e = t.split("?")[0].toLowerCase();
    return be.some(a => e.endsWith(a))
}
function D(t) {
    const e = document.querySelector(".video-container");
    e && e.classList.toggle("audio-mode", t === "music")
}
function _(t, e, a) {
    if (u) {
        try {
            typeof u.destroy == "function" && u.destroy()
        } catch (i) {
            console.warn("[videoplayer] destroying previous player failed:", i)
        }
        document.getElementById("videoEl").innerHTML = ""
    }
    A = null;
    const o = a && a.mediaKind ? String(a.mediaKind).toLowerCase() : ""
      , n = a && (a.isAudio || o === "audio" || o.startsWith("audio/")) || K(t);
    D(n ? "music" : "standard"),
    setTimeout( () => {
        if (window.ZWPlayer) {
            const i = {
                playerElm: "videoEl",
                autoplay: !0,
                recordButton: !0,
                segmentButton: !0,
                disableMutedConfirm: !0,
                url: "mf/cache/iptv4.json",
                xmc_url: "https://xmcdemo.zwplayer.com:11693/",
                localPlayback: !0,
                controlbar: !0,
                optionButton: !0,
                chapterButton: !0,
                fluid: !window.matchMedia("(max-width: 768px)").matches,
                snapshotButton: !0,
                speedButton: !0,
                autoSmallWindow: !0,
                infoButton: !0,
                keepAudioWindow: !0,
                subtitleDownload: !0,
                iosWebFullscreen: !0,
                annotationButton: !0,
                castButton: !0,
                zoomButton: !0,
                hideControlbarTimeout: 5e3,
                ratio: "16:9",
                vr: {
                    mode: "auto"
                },
                lang: E(),
                ...n ? {
                    mode: "music",
                    mediaKind: "audio",
                    music: {
                        panel: "full",
                        vinyl: !0,
                        visualizer: "mountain",
                        mediaSession: !0
                    }
                } : {},
                translateApi: "https://ain1.mnbaba.com/subtitle-api/api",
                onFileLoaded: function(r) {
                    r && r.url && r.file && k(r.url, r.file.name, !1)
                },
                ontimeupdate: function(r) {
                    if (!S)
                        return;
                    const c = u && u._config && u._config.url;
                    if (!c || String(c).startsWith("blob:"))
                        return;
                    const l = u && u.videoEl && u.videoEl.duration;
                    if (typeof l != "number" || !isFinite(l))
                        return;
                    const s = Date.now();
                    (!R || s - R >= 5e3) && (R = s,
                    M(c, r, l))
                },
                onmediaevent: function(r) {
                    if (!r)
                        return;
                    if (r.type === "play" && A !== null) {
                        const f = A;
                        A = null,
                        ye(f);
                        return
                    }
                    if (!S || r.type !== "pause" && r.type !== "ended")
                        return;
                    const c = u && u._config && u._config.url;
                    if (!c || String(c).startsWith("blob:"))
                        return;
                    const l = u && u.videoEl;
                    if (!l)
                        return;
                    const s = l.duration;
                    typeof s != "number" || !isFinite(s) || M(c, r.type === "ended" ? 0 : l.currentTime, s)
                },
                onModeChange: function(r, c) {
                    return D(c),
                    !0
                }
            };
            

            
            t && (i.url = t),
            e !== void 0 && (i.isLive = e),
            a && typeof a.resumePosition == "number" && (A = a.resumePosition),
            u = new window.ZWPlayer(i),
            window.playerInstance = u
        } else
            console.error("[videoplayer] window.ZWPlayer is missing (library failed to load?)"),
            g(d("form.initFail"))
    }
    , 100)
}
function ve() {
    const t = document.getElementById("videoEl")
      , e = document.querySelector(".header")
      , a = document.querySelector(".sidebar-tabs");
    if (t && typeof MutationObserver < "u") {
        const s = () => {
            const f = t.classList.contains("zwp-fullscreen-win") || t.classList.contains("zwp-fullscreen");
            document.body.classList.toggle("player-fullscreen", f),
            e && (e.style.display = f ? "none" : ""),
            a && (a.style.display = f ? "none" : "")
        }
        ;
        new MutationObserver(s).observe(t, {
            attributes: !0,
            attributeFilter: ["class"]
        }),
        s()
    }
    const o = document.getElementById("btnLoadUrl")
      , n = document.getElementById("btnLoadFile")
      , i = document.getElementById("videoFileInput")
      , r = document.getElementById("videoUrlInput")
      , c = document.getElementById("chkLive")
      , l = document.getElementById("btnClearUrl");
    r && l && (r.addEventListener("input", () => {
        l.classList.toggle("visible", !!r.value.trim())
    }
    ),
    l.addEventListener("click", () => {
        r.value = "",
        l.classList.remove("visible"),
        r.focus()
    }
    )),
    o.addEventListener("click", () => {
        const s = r.value.trim()
          , f = c.checked;
        if (s) {
            if (!N(s)) {
                g(d("form.invalidUrl"));
                return
            }
            const m = B(s);
            _(s, f),
            k(s, m, f),
            P(s, f, m)
        }
    }
    ),
    n.addEventListener("click", () => i.click()),
    i.addEventListener("change", s => {
        const f = Array.from(s.target.files);
        if (f.length > 0) {
            const m = f[0]
              , y = URL.createObjectURL(m)
              , L = m.type && m.type.startsWith("audio/") || K(m.name);
            _(y, !1, {
                isAudio: L
            }),
            k(y, m.name, !1),
            P(y, !1, m.name),
            f.slice(1).forEach(T => {
                k(URL.createObjectURL(T), T.name, !1)
            }
            )
        }
        i.value = ""
    }
    ),
    document.getElementById("btnClearHistory").addEventListener("click", () => {
        p = [],
        v(),
        w()
    }
    ),
    document.getElementById("btnClearFavs").addEventListener("click", () => {
        h = [],
        v(),
        w()
    }
    )
}
function we() {
    document.getElementById("btnFav").addEventListener("click", () => {
        const e = document.getElementById("videoUrlInput").value.trim();
        if (!e || e.startsWith("blob:")) {
            g(d("form.nocollent") || "Cannot bookmark empty or local file URL.");
            return
        }
        const a = document.getElementById("chkLive").checked;
        J(e, B(e), a),
        g(d("collect.success") || "Added to favorites")
    }
    )
}
function Se(t, e, a) {
    const o = document.getElementById("editDialog")
      , n = document.getElementById("editTitleInput")
      , i = document.getElementById("editUrlInput")
      , r = document.getElementById("btnConfirmEdit")
      , c = document.getElementById("btnCancelEdit");
    if (!o || !n || !i || !r || !c)
        return;
    n.value = t,
    i.value = e,
    o.showModal(),
    requestAnimationFrame( () => {
        n.focus(),
        n.select()
    }
    );
    const l = new AbortController
      , {signal: s} = l;
    o.addEventListener("close", () => l.abort(), {
        signal: s
    });
    const f = () => {
        const y = n.value.trim()
          , L = i.value.trim();
        y && a(y, L || e),
        o.close()
    }
      , m = () => o.close();
    r.addEventListener("click", f, {
        signal: s
    }),
    c.addEventListener("click", m, {
        signal: s
    })
}
function ke(t) {
    const e = p[t];
    if (!e)
        return;
    const a = document.getElementById("videoUrlInput")
      , o = document.getElementById("chkLive");
    a && (a.value = e.url),
    o && (o.checked = !!e.islive);
    const n = e.islive ? void 0 : typeof e.position == "number" ? e.position : void 0;
    _(e.url, !!e.islive, {
        resumePosition: n
    }),
    k(e.url, e.title, !!e.islive, e.subtitle, e.position, e.duration),
    P(e.url, !!e.islive, e.title),
    C()
}
function Le(t) {
    const e = h[t];
    if (!e)
        return;
    const a = document.getElementById("videoUrlInput")
      , o = document.getElementById("chkLive");
    a && (a.value = e.url),
    o && (o.checked = !!e.islive);
    let n;
    if (!e.islive) {
        const i = p.find(r => r.url === e.url);
        i && typeof i.position == "number" && (n = i.position)
    }
    _(e.url, !!e.islive, {
        resumePosition: n
    }),
    k(e.url, e.title, !!e.islive),
    P(e.url, !!e.islive, e.title),
    C()
}
function Ee(t) {
    p.splice(t, 1),
    v(),
    w()
}
function Te(t) {
    h.splice(t, 1),
    v(),
    w()
}
function qe(t, e) {
    const a = (e ? h : p)[t];
    a && Z(a.url, !!a.islive, a.title)
}
function Ae(t) {
    const e = p[t];
    if (e) {
        if (Q(e.url)) {
            g(d("collect.exists") || "Already in favorites");
            return
        }
        J(e.url, e.title, !!e.islive),
        g(d("collect.success") || "Added to favorites")
    }
}
function Ce(t, e) {
    const o = (e ? h : p)[t];
    o && Se(o.title, o.url, (n, i) => {
        o.title = n,
        o.url = i,
        v(),
        w()
    }
    )
}
function Pe() {
    const t = e => {
        const a = e.target.closest("[data-act]");
        if (!a)
            return;
        const o = a.getAttribute("data-act")
          , n = parseInt(a.getAttribute("data-idx"), 10)
          , i = a.getAttribute("data-isfav") === "1";
        if (o === "copy") {
            j(a.getAttribute("data-clip"));
            return
        }
        if (o === "edit") {
            Ce(n, i);
            return
        }
        if (o === "play") {
            i ? Le(n) : ke(n);
            return
        }
        if (o === "delete") {
            i ? Te(n) : Ee(n);
            return
        }
        if (o === "share") {
            qe(n, i);
            return
        }
        if (o === "fav") {
            Ae(n);
            return
        }
    }
    ;
    ["historyTbody", "favsTbody"].forEach(e => {
        const a = document.getElementById(e);
        a && a.addEventListener("click", t)
    }
    )
}
function _e() {
    const t = document.getElementById("chkAutoSave")
      , e = localStorage.getItem("zw_auto_save");
    S = e === null ? !0 : e === "1",
    t.checked = S,
    t.addEventListener("change", () => {
        S = t.checked,
        localStorage.setItem("zw_auto_save", S ? "1" : "0")
    }
    )
}
function w() {
    const t = document.getElementById("historyTbody")
      , e = document.getElementById("favsTbody")
      , a = (o, n, i) => {
        const c = o.url.startsWith("blob:") ? `<span style="color:#e74c3c">${q(o.url)}</span>` : q(o.url)
          , l = q(o.title)
          , s = q(o.url)
          , f = !i && Q(o.url)
          , m = o.islive ? `<span class="badge-live" data-i18n="table.liveShort">${d("table.liveShort")}</span>` : ""
          , y = o.date ? q(String(o.date).split(" ")[0]) : ""
          , L = `<div class="cell-text"><span class="text-clamp-1" title="${l}">${l}</span></div>`
          , T = `<div class="cell-text"><span class="text-clamp-2" title="${s}">${c}</span></div>`
          , U = `<button class="btn-action" data-act="edit" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.editTitle")}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        <span>${d("table.edit")}</span>
      </button>`
          , W = `<button class="btn-action" data-act="copy" data-idx="${n}" data-clip="${s}" title="${d("table.copy")}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span>${d("table.copy")}</span>
      </button>`
          , H = `<button class="btn-action share-action" data-act="share" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.share")}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        <span>${d("table.share")}</span>
      </button>`
          , $ = `<button class="share-inline" data-act="share" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.share")}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></button>`;
        return i ? `
        <tr>
          <td class="col-date">${y} ${m} ${$}</td>
          <td title="${l}" class="col-title">${L}</td>
          <td title="${s}" class="col-url">${T}</td>
          <td class="col-actions">
            <div class="action-cell">
              ${U}
              ${W}
              ${H}
              <button class="btn-action" data-act="play" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.play")}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>${d("table.play")}</span>
              </button>
              <button class="btn-action" data-act="delete" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.delete")}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                <span>${d("table.delete")}</span>
              </button>
            </div>
          </td>
        </tr>
      ` : `
      <tr>
        <td class="col-date">${y} ${m} ${$}</td>
        <td title="${l}" class="col-title">${L}</td>
        <td title="${s}" class="col-url">${T}</td>
        <td class="col-actions">
          <div class="action-cell">
            ${U}
            ${W}
            ${H}
              <button class="btn-action fav-action" data-act="fav" data-idx="${n}" title="${d("table.fav")}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${f ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${d("table.fav")}</span>
            </button>
            <button class="btn-action" data-act="play" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.play")}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>${d("table.play")}</span>
            </button>
            <button class="btn-action" data-act="delete" data-idx="${n}" data-isfav="${i ? 1 : 0}" title="${d("table.delete")}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>${d("table.delete")}</span>
            </button>
          </div>
        </td>
      </tr>
    `
    }
    ;
    p.length === 0 ? t.innerHTML = `<tr><td colspan="4" class="empty-cell">${d("playlist.empty")}</td></tr>` : t.innerHTML = p.map( (o, n) => a(o, n, !1)).join(""),
    h.length === 0 ? e.innerHTML = `<tr><td colspan="4" class="empty-cell">${d("favorites.empty")}</td></tr>` : e.innerHTML = h.map( (o, n) => a(o, n, !0)).join("")
}
