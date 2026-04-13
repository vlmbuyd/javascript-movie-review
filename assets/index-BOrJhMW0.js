(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const searchIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAALZJREFUeAGtkQENwzAMBK0hCIMFQiAUwiAUQhm0TDoGgVAIg5Ax6Bhk3vaVflUcRVVfekWK7XPsiJypnLNTj+qUf1rVUR1aigMKLI21Yk9dF3VH9xNBBgswIyEa8WEbyQI8kGDOSi8MpeBXUpGG70jr+f6C84UkV2FccT5L9AX0ScrdPS3SlRI6a9P43oTYLJZ23/UpiPQyvvc1SE/dNq2ApyYIjXSDHe2hHWKA/yByRAQ5BtjrDXDaZj4YxEyHAAAAAElFTkSuQmCC";
function createSearchForm() {
  const formWrapper = document.createElement("div");
  formWrapper.className = "search-form-wrapper";
  const form = document.createElement("form");
  form.className = "search-form";
  form.action = "/search";
  form.method = "get";
  const input = document.createElement("input");
  input.type = "text";
  input.name = "query";
  input.placeholder = "검색어를 입력하세요";
  input.className = "search-input";
  const button = document.createElement("button");
  button.type = "submit";
  button.className = "search-button";
  const icon = document.createElement("img");
  icon.src = searchIconSrc;
  icon.alt = "검색";
  button.appendChild(icon);
  form.append(input, button);
  formWrapper.appendChild(form);
  return { formWrapper, form, input };
}
function createButton(type, text) {
  const button = document.createElement("button");
  button.className = `primary ${"detail"}`;
  button.textContent = text;
  return button;
}
const starIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ4SURBVHgB7VlNctMwFP7UwrRl0/YGzgloNwyURd0TQE5AeoK2J2hyAuAEaU9QOEHMgvCzSW9QcwLChqbDNOI9RVEk106sWGZY5JvR+FlRJD29fxlYYYX/F/I79uQXxKgRAjWANh3Ro0ct0l0ptSPxQj2DYg31oIvZ5qHpLmpAcAno07+ZdWBIq+zoN5ZCgoCoQwLnhhK4oBUS8y7xGoFRhwT49CP9eqSfPb3aEBtoiH16BkJQCdDmW7AMl9VFq0w6GUCqdKvGBENoFXpj0R2LvjSUwCsERDAGtPHGVldiqBHeWf0xxwcEQkgJOMZr+3xxpHQ+Mb//CWfMIRmIDSUtlZlhplLrOJED41orIQgDecabHaP6pPY+E2OOEQChJFBkvC4E3lv0CQIgNw4o8Y6UiCNicQdjanxqQrVtQ0s9xk0bGkU5j+zR+E38tFa/1pF6aD1/GXrqfteJfkySzYkfImfjV8CS4mXjfY7jeUNkn+YXSxvxBR3Amc3II+fnEd4CS+tmQlH2bOGoO2JwC8umFS3aI8MckiuBPol3lnilqs3EyfjxQORjak/yxTsPStq/tYraKikMvY2pak769/SOhyTl3ek8j+aswb68g5qgGb4uM1Z+oxgzzg9+rheyvQTQll9xFcpfLwNeW9nMGG2r+4M9xmWAQ760BrCejjDQacI/hVqT1nYMXtDeMnYmCv7chp0asC2soymelRN5VcjPpC5ryhtGpnOMjnjpSEIhN5CR7reJNZvTCPckiT5OUTNIbU9oVwPYm5fkOnM2z5hb0OSeBNlGXcatjbVtdaX03qTNF0p+YUWWc8Mw1cXjUJWVchS3VPS7+s5RurnoJqNUSalSgI3MAnw6m9ivyoSO/lmVuaRgd1pm7lLJHOfz4gBNuIlaFKQ8HKlDicw7G+sBWmUPxisbVcYtrVixhqeojtiiO0XGWgT/dFqoED+BpNSiOlJrPu+g6c+AdEJ6gupIDLVEwe91L5S9dSOVqnyvpB3EjUkiN7Hr4xj8JBD+9CcFv7D8/MgvzfZjwBXxp0XDPa7XZ3NJvysXXxuILTopGsSbppRgwOkHvfb4unFBQpgYytMOSuuwo/+ZosKM4aB0R+mALMiZJGW7lLLnRddMMdUo+y3BRwKxtZEHuYlSFY6o9ualrtymEOq3nr6GcSGcOWOUhA8Dh5ht7KMhSTLUOFdy8yVWC4F91eBcdPGYLv2n66iVNSf95xAlsZwE9Gmp1FcqPY+tjQxpVk7C1Ccl3VqYFOKpNR/39UyKbktAlpeAjw1I65Xv/c+RFTWnGVuUbhf4cX3ibbgXYYxUzSlVBeZlBz4M9FCsmym147Kfj9Tt9P2DOiOLUgz4qFCnsJ/Tao9vX1ya0vjGnDnTsl7IL5XoU5Sc3GlGyhNR2Vn106lSK6lu66YBLEVNn2RrBZevqoRdYYUVvPAXJrOCc9SFL6sAAAAASUVORK5CYII=";
function createHero({
  backgroundImageUrl,
  rating,
  title
}) {
  const hero = document.createElement("div");
  hero.className = "hero";
  hero.appendChild(
    createBackgroundContainer(backgroundImageUrl, rating, title)
  );
  return hero;
}
function createBackgroundContainer(imageUrl, rating, title) {
  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background-container";
  backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.setAttribute("aria-hidden", "true");
  const topRatedContainer = document.createElement("div");
  topRatedContainer.className = "top-rated-container";
  topRatedContainer.appendChild(createTopRatedMovie(rating, title));
  backgroundContainer.append(overlay, topRatedContainer);
  return backgroundContainer;
}
function createTopRatedMovie(rating, title) {
  const topRatedMovie = document.createElement("div");
  topRatedMovie.className = "top-rated-movie";
  const titleDiv = document.createElement("div");
  titleDiv.className = "title";
  titleDiv.textContent = title;
  topRatedMovie.append(
    createRateSection(rating),
    titleDiv,
    createButton("detail", "자세히 보기")
  );
  return topRatedMovie;
}
function createRateSection(rating) {
  const rateDiv = document.createElement("div");
  rateDiv.className = "rate";
  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";
  const rateValue = document.createElement("span");
  rateValue.className = "rate-value";
  rateValue.textContent = String(rating);
  rateDiv.append(starImg, rateValue);
  return rateDiv;
}
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const PAGE_SIZE = 20;
const STORAGE_KEY = "movie_ratings";
const RATING_LABELS = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요"
};
function createSkeleton(count = PAGE_SIZE) {
  const skeletonWrapper = document.createElement("ul");
  skeletonWrapper.className = "thumbnail-list";
  const skeletons = Array.from({ length: count }, () => {
    const skeleton = document.createElement("li");
    skeleton.className = "skeleton";
    return skeleton;
  });
  skeletons.forEach((card) => skeletonWrapper.appendChild(card));
  return skeletonWrapper;
}
const starFilledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKXSURBVHgB7ZhBbtQwFIZ/zyAxu8IN0hNANqh0Q+YG9ASlJyhzgpmeADgBvQG9QbOCJXMDwgnIqoyEqPnjcWmVxElsPU9bKZ/kZuQ4rp/f+/OeA4yMjDxqFCKhvyHh7B+gUWKGhUp5jcATxGPJxb81v67wk39XiMAE8cj+/5riVH/HM0QgigEMn3e8JLcdXPzvOwYJEssDx40ehVNEQFzERrzAj9abU6TqFdYQJIYHls47f6yoBYlhQOa8E0HMogY0xNsYIC9maQ8c944QFrOYiDvFW2eG51KZWdIDy8Ejr/AeQnh7wIhwwzZl+8s2YbvGC/iXCmd8ds1nS85Vcq6qZip9PdNqAMOh2s3ENMUFattUnHKguQAaoYwhBbarLNm3Vq9pdI2GAfZN8hkPEc2q9hAf73ZNWgbtZpdDUM3wahhgLTzDQ0PjE0PovN7tFDFDaQWfN0tMWkLnhs63EI3IsNVDgvtgK+Yj7nzuGtL7GrUJ6hK7N6Jgm3PxRdeg3kRmJ5iz5dgdOXNC2rf4Cq9EthNdVGI9HJ6p/TNxTCM6xOoiqJjTX3kwUfgCWeZdYnURXI3SE1XlmUCGgovfRwBhHrhktp7hFyQJLLHDyukZXkKaTdicYQZo+cN56JyhB5o3kCdoTv/XaIz4vyFAB/4eeBrnE6Eh4ItFSAhlA8cVbCe2FQOfyeBJiAH9scpywNYy56aG3yA1fRJz1/CrhfriX/GQXpUDjow6qLL11IGfB1zxr82he6EOzK7nrser6tJmXPeJz1MHfgao1mSTsz/1KcJoxIqXfT530XI7gwd+BlzzH2rr3u31hIuZD6nb6xhvHOAIdZFPsAcPQsrpBNUuzXAh9XnQzrnipuxxRYuQDRkZGRm5H/4BIkyx5W7xkPAAAAAASUVORK5CYII=";
const closeButtonSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFcSURBVHgBndVRToMwGAfw7+uyPXOEeQM9gezRGOcNBjzqNHEn8AhiIizxpYDxeZHps7uBu4EcwefpWlsYZsNSyv7JlrS0v0D7FQA2eXx+O5Q/2COUzqzp09wu2yj/wiS94xxu8g4E/3I0nJiCYfzqMGC+gCzRzAjrDjCg4u7I+mNnJEI0Hg09E5ADi3Z7+T1RjubgBklKoTVYhIy90yUHHreBNaB4/J6PZeshfokQ0Pk3rLIUerA7uPBOMtzubYJNwGJ4JXWwqIqFqBC7CVSiOtgErEUNYSWoRWXCZP7OObcVl74EeKQCZdR1CptdVoMyFut839bNxVqwprArs5UnD/cGNTAxBOWmHJiePDQE/3bZ5ORhG7BME4xTOusz0vk0BZtgcfImhEHPagvKXDnnrmqNRRn2yQpWYiLP2oBamOEyX9NiCUj+OZHvQxNwOwFNXdKB4581xtfe2eIXnjrtn65LhjUAAAAASUVORK5CYII=";
class Modal {
  background;
  ratingRepo;
  constructor(ratingRepo) {
    this.ratingRepo = ratingRepo;
    this.background = this.createBackground();
    document.body.appendChild(this.background);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  }
  createBackground() {
    const background = document.createElement("div");
    background.className = "modal-background";
    const modal = document.createElement("div");
    modal.className = "modal";
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.setAttribute("aria-label", "모달 닫기");
    const closeImg = document.createElement("img");
    closeImg.src = closeButtonSrc;
    closeImg.alt = "닫기";
    closeBtn.appendChild(closeImg);
    closeBtn.addEventListener("click", () => this.close());
    const container = document.createElement("div");
    container.className = "modal-container";
    const imageDiv = document.createElement("div");
    imageDiv.className = "modal-image";
    const posterImg = document.createElement("img");
    posterImg.id = "modal-poster";
    imageDiv.appendChild(posterImg);
    const descDiv = document.createElement("div");
    descDiv.className = "modal-description";
    descDiv.id = "modal-desc";
    container.append(imageDiv, descDiv);
    modal.append(closeBtn, container);
    background.appendChild(modal);
    background.addEventListener("click", (e) => {
      if (e.target === background) this.close();
    });
    return background;
  }
  open(data) {
    this.renderContent(data);
    this.background.classList.add("active");
    document.body.classList.add("modal-open");
  }
  close() {
    this.background.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
  renderContent(data) {
    const poster = this.background.querySelector("#modal-poster");
    poster.src = `${IMAGE_BASE_URL}/w500${data.posterPath}`;
    poster.alt = data.title;
    const desc = this.background.querySelector("#modal-desc");
    desc.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = data.title;
    const category = document.createElement("p");
    category.className = "category";
    category.textContent = `${data.releaseYear} · ${data.genres.join(", ")}`;
    const rateP = document.createElement("p");
    rateP.className = "rate";
    const rateLabel = document.createElement("span");
    rateLabel.textContent = "평점 ";
    const starImg = document.createElement("img");
    starImg.src = starFilledSrc;
    starImg.className = "star";
    const rateSpan = document.createElement("span");
    rateSpan.textContent = data.rating.toFixed(1);
    rateP.append(rateLabel, starImg, rateSpan);
    const myRatingSection = this.createMyRatingSection(data.id);
    const hr = document.createElement("hr");
    const overviewTitle = document.createElement("strong");
    overviewTitle.textContent = "줄거리";
    const detailP = document.createElement("p");
    detailP.className = "detail";
    detailP.textContent = data.overview || "줄거리 정보가 없습니다.";
    desc.append(
      title,
      category,
      rateP,
      myRatingSection,
      hr,
      overviewTitle,
      detailP
    );
  }
  createMyRatingSection(movieId) {
    const section = document.createElement("div");
    section.className = "my-rating";
    const label = document.createElement("span");
    label.className = "my-rating-label";
    label.textContent = "내 별점";
    const starsDiv = document.createElement("div");
    starsDiv.className = "my-rating-stars";
    const ratingText = document.createElement("span");
    ratingText.className = "my-rating-text";
    const savedRating = this.ratingRepo.getRating(movieId);
    this.renderStars(starsDiv, ratingText, movieId, savedRating ?? 0);
    section.append(label, starsDiv, ratingText);
    return section;
  }
  renderStars(container, ratingText, movieId, currentRating) {
    container.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const score = i * 2;
      const btn = document.createElement("button");
      btn.className = "star-btn";
      btn.setAttribute("aria-label", `${score}점`);
      const img = document.createElement("img");
      img.src = score <= currentRating ? starFilledSrc : starIconSrc;
      img.alt = score <= currentRating ? "full-star" : "empty-star";
      btn.appendChild(img);
      btn.addEventListener("mouseenter", () => {
        this.highlightStars(container, i);
      });
      btn.addEventListener("mouseleave", () => {
        const saved = this.ratingRepo.getRating(movieId) ?? 0;
        this.renderStars(container, ratingText, movieId, saved);
      });
      btn.addEventListener("click", () => {
        this.ratingRepo.setRating(movieId, score);
        this.renderStars(container, ratingText, movieId, score);
        ratingText.textContent = `${RATING_LABELS[score]} (${score}/10)`;
      });
      container.appendChild(btn);
    }
    ratingText.textContent = currentRating > 0 ? `${RATING_LABELS[currentRating]} (${currentRating}/10)` : "";
  }
  highlightStars(container, upToIndex) {
    const buttons = container.querySelectorAll(".star-btn");
    buttons.forEach((btn, idx) => {
      const img = btn.querySelector("img");
      img.src = idx < upToIndex ? starFilledSrc : starIconSrc;
    });
  }
}
const apiRequest = async ({
  url,
  method = "GET"
}) => {
  return await fetch(`${"https://api.themoviedb.org/3"}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDUwZjNiZWNjZGFmZGJiMGIyNGJmYTNjZTZlMzc0MSIsIm5iZiI6MTcxNTQzODA1Ni4xNjUsInN1YiI6IjY2M2Y4MWU4ZWE5ZjBlNzE0NmMxOWNkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4GfIbLP5zQams-cOBeP_pGp9daB6ZoSfr2cL763xRFU"}`,
      "Content-Type": "application/json"
    }
  }).then((res) => res.json());
};
const fetchPopularMovies = (page) => apiRequest({
  url: `/movie/popular?language=ko-KR&page=${page}`
});
const fetchSearchMovies = (query, page) => apiRequest({
  url: `/search/movie?language=ko-KR&query=${encodeURIComponent(query)}&page=${page}`
});
const fetchMovieDetail = (id) => apiRequest({
  url: `/movie/${id}?language=ko-KR`
});
function createMovieList(movies, onMovieClick) {
  const section = document.createElement("section");
  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";
  movies.forEach((movie) => {
    const card = createMovieCard(movie, onMovieClick);
    ul.appendChild(card);
  });
  section.append(ul);
  return section;
}
function createMovieCard(movie, onMovieClick) {
  const { title, poster_path: posterImg, vote_average: rating, id } = movie;
  const li = document.createElement("li");
  const item = document.createElement("div");
  item.className = "item";
  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = `${IMAGE_BASE_URL}/w500${posterImg}`;
  thumbnail.alt = title;
  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";
  const rateP = document.createElement("p");
  rateP.className = "rate";
  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";
  const rateSpan = document.createElement("span");
  rateSpan.textContent = (rating ?? 0).toFixed(1);
  rateP.append(starImg, rateSpan);
  const titleStrong = document.createElement("strong");
  titleStrong.textContent = title;
  itemDesc.append(rateP, titleStrong);
  item.append(thumbnail, itemDesc);
  li.appendChild(item);
  if (onMovieClick) {
    li.style.cursor = "pointer";
    li.addEventListener("click", () => onMovieClick(id));
  }
  return li;
}
function setupInfiniteScroll(container, onLoadMore) {
  const trigger = document.createElement("div");
  container.appendChild(trigger);
  let isLoading = false;
  const observer = new IntersectionObserver(async ([entry]) => {
    if (!entry.isIntersecting || isLoading) return;
    isLoading = true;
    await onLoadMore();
    container.appendChild(trigger);
    isLoading = false;
  });
  observer.observe(trigger);
  return () => {
    observer.disconnect();
    trigger.remove();
  };
}
const renderPopularMovieList = async (mainEl, skeletonEls, onMovieClick) => {
  let page = 1;
  const data = await fetchPopularMovies(page);
  skeletonEls.replaceWith(createMovieList(data.results, onMovieClick));
  if (data.total_pages <= page) return () => {
  };
  let stop = () => {
  };
  stop = setupInfiniteScroll(mainEl, async () => {
    page++;
    const skeleton = createSkeleton();
    mainEl.appendChild(skeleton);
    const nextData = await fetchPopularMovies(page);
    skeleton.replaceWith(createMovieList(nextData.results, onMovieClick));
    if (nextData.total_pages <= page) stop();
  });
  return stop;
};
const handleSearch = async (query, mainEl, titleEl, onMovieClick) => {
  updateSearchUrl(query);
  titleEl.textContent = `"${query}" 검색 결과`;
  mainEl.innerHTML = "";
  mainEl.appendChild(titleEl);
  const skeleton = createSkeleton();
  mainEl.appendChild(skeleton);
  let page = 1;
  const data = await fetchSearchMovies(query, page);
  skeleton.remove();
  if (data.results.length === 0) {
    const noResultEl = document.createElement("p");
    noResultEl.className = "no-search-result";
    noResultEl.textContent = "검색 결과가 없습니다.";
    mainEl.appendChild(noResultEl);
    return () => {
    };
  }
  mainEl.appendChild(createMovieList(data.results, onMovieClick));
  if (data.total_pages <= page) return () => {
  };
  let stop = () => {
  };
  stop = setupInfiniteScroll(mainEl, async () => {
    page++;
    const moreSkeleton = createSkeleton();
    mainEl.appendChild(moreSkeleton);
    const nextData = await fetchSearchMovies(query, page);
    moreSkeleton.replaceWith(createMovieList(nextData.results, onMovieClick));
    if (nextData.total_pages <= page) stop();
  });
  return stop;
};
const updateSearchUrl = (query) => {
  const params = new URLSearchParams();
  params.set("query", query);
  history.pushState({}, "", `/search?${params.toString()}`);
};
class LocalStorageRatingRepository {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }
  getRating(movieId) {
    return this.getAll()[movieId] ?? null;
  }
  setRating(movieId, rating) {
    const all = this.getAll();
    all[movieId] = rating;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}
addEventListener("load", async () => {
  const headerEl = document.querySelector("header");
  const heroEl = document.querySelector("#hero");
  const mainEl = document.querySelector("#main");
  const titleEl = document.querySelector(".main-title");
  const ratingRepo = new LocalStorageRatingRepository();
  const modal = new Modal(ratingRepo);
  const onMovieClick = async (id) => {
    try {
      const detail = await fetchMovieDetail(id);
      modal.open({
        id: detail.id,
        title: detail.title,
        posterPath: detail.poster_path,
        releaseYear: detail.release_date.slice(0, 4),
        genres: detail.genres.map((g) => g.name),
        rating: detail.vote_average,
        overview: detail.overview
      });
    } catch (error) {
      alert(`영화 상세 정보를 불러오는 데 실패했습니다. ${error}`);
    }
  };
  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2"
  });
  heroEl.appendChild(hero);
  const { formWrapper, form, input } = createSearchForm();
  headerEl.appendChild(formWrapper);
  const skeletonEls = createSkeleton();
  mainEl.appendChild(skeletonEls);
  let stopInfiniteScroll = await renderPopularMovieList(
    mainEl,
    skeletonEls,
    onMovieClick
  );
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    stopInfiniteScroll();
    stopInfiniteScroll = await handleSearch(
      query,
      mainEl,
      titleEl,
      onMovieClick
    );
  });
});
