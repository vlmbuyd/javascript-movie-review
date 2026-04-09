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
  button.className = `primary ${type === "detail" ? "detail" : "full-width"}`;
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
function createMovieList(movies) {
  const section = document.createElement("section");
  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";
  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    ul.appendChild(card);
  });
  section.append(ul);
  return section;
}
function createMovieCard({
  title,
  poster_path: posterImg,
  vote_average: rating
}) {
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
  return li;
}
const hideLoadMoreButton = (loadMoreBtnEl) => {
  loadMoreBtnEl.classList.add("hidden");
};
const handleLoadMoreButton = async (url, loadMoreBtnEl, mainEl, skeletonEls) => {
  loadMoreBtnEl.disabled = true;
  mainEl.append(skeletonEls, loadMoreBtnEl);
  const data = await apiRequest({
    url,
    method: "GET"
  });
  if (data) {
    loadMoreBtnEl.disabled = false;
    const newMovieList = createMovieList(data.results);
    skeletonEls.replaceWith(newMovieList);
  }
};
const renderPopularMovieList = async (loadMoreBtnEl, mainEl, skeletonEls) => {
  let page = 1;
  const data = await apiRequest({
    url: `/movie/popular?language=ko-KR&page=${page}`,
    method: "GET"
  });
  const movieList = createMovieList(data.results);
  skeletonEls.replaceWith(movieList, loadMoreBtnEl);
  if (data.total_pages === page) hideLoadMoreButton(loadMoreBtnEl);
  loadMoreBtnEl.onclick = () => {
    page++;
    handleLoadMoreButton(
      `/movie/popular?language=ko-KR&page=${page}`,
      loadMoreBtnEl,
      mainEl,
      skeletonEls
    );
  };
};
const handleSearch = (input, loadMoreBtnEl, mainEl, titleEl, skeletonEls) => {
  return async (event) => {
    event.preventDefault();
    let page = 1;
    const query = input.value.trim();
    if (!query) return;
    updateSearchUrl(query);
    const data = await apiRequest({
      url: `/search/movie?language=ko-KR&query=${query}&page=${page}`,
      method: "GET"
    });
    renderSearchResult(
      data,
      mainEl,
      titleEl,
      query,
      loadMoreBtnEl,
      skeletonEls
    );
  };
};
const updateSearchUrl = (query) => {
  const params = new URLSearchParams();
  params.set("query", query);
  history.pushState({}, "", `/search?${params.toString()}`);
};
const renderSearchResult = (data, mainEl, titleEl, query, loadMoreBtnEl, skeletonEls) => {
  let page = 1;
  titleEl.textContent = `"${query}" 검색 결과`;
  mainEl.innerHTML = "";
  mainEl.appendChild(titleEl);
  if (data.total_pages === page) hideLoadMoreButton(loadMoreBtnEl);
  if (data.results.length === 0) {
    const noSearchResultEl = document.createElement("p");
    noSearchResultEl.textContent = "검색 결과가 없습니다.";
    noSearchResultEl.className = "no-search-result";
    mainEl.appendChild(noSearchResultEl);
    return;
  }
  if (data.results.length > 0) {
    const searchResult = createMovieList(data.results);
    mainEl.append(searchResult, loadMoreBtnEl);
  }
  loadMoreBtnEl.onclick = () => {
    page++;
    handleLoadMoreButton(
      `/search/movie?language=ko-KR&query=${query}&page=${page}`,
      loadMoreBtnEl,
      mainEl,
      skeletonEls
    );
  };
};
addEventListener("load", async () => {
  const headerEl = document.querySelector("header");
  const heroEl = document.querySelector("#hero");
  const mainEl = document.querySelector("#main");
  const titleEl = document.querySelector(".main-title");
  const hero = createHero({
    backgroundImageUrl: `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg`,
    rating: 9.5,
    title: "인사이드 아웃2"
  });
  heroEl.appendChild(hero);
  const { formWrapper, form, input } = createSearchForm();
  headerEl.appendChild(formWrapper);
  const loadMoreBtnEl = createButton("more", "더 보기");
  const skeletonEls = createSkeleton();
  mainEl.appendChild(skeletonEls);
  renderPopularMovieList(loadMoreBtnEl, mainEl, skeletonEls);
  form.addEventListener(
    "submit",
    handleSearch(input, loadMoreBtnEl, mainEl, titleEl, skeletonEls)
  );
});
