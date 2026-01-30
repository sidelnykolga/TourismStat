const siteNames = {
  bukovel: "Буковель",
  dragobrat: "Драгобрат",
  zaharBerkut: "Захар Беркут",
  play: "Плай",
  krasiya: "Красія",
  bukovytsia: "Буковиця",
  kosyno: "Косино",
  sribniTermy: "Срібні Терми",
  zhayvoronok: "Жайворонок",
  tepliVody: "Теплі води",
  solotvyno: "Термальні води Солотвино",
  moreKs: "more.ks.ua"
};

const siteUrls = {
  bukovel: "https://bukovel.com/",
  dragobrat: "https://www.drago-brat.com/",
  zaharBerkut: "https://zaharberkut.ua/",
  play: "https://play-karpaty.com/",
  krasiya: "https://krasiya.com.ua/",
  bukovytsia: "https://bukovytsia.com/",
  kosyno: "https://kosino.ua/",
  sribniTermy: "https://derenivska-kupil.ua/spa/",
  zhayvoronok: "https://zhayvoronok.net/",
  tepliVody: "https://tepli-vody.com.ua/",
  solotvyno: "https://solotvyno.info/termalni-vody/",
  moreKs: "https://more.ks.ua/pansionat/kurort/82"
};

const siteImg = {
  bukovel: "img/bukovel.jpg",
  dragobrat: "https://vidviday.ua/storage/media/place/18598/untitled-design-2024-10-31t162730276.jpg",
  zaharBerkut: "https://zaharberkut.ua/wp-content/uploads/zahar-berkut-252.jpg",
  play: "https://vkazivnyk.com/images/Enterprise/play/Gallery/Nature/play-07.jpg",
  krasiya: "https://krasiya.com.ua/wp-content/uploads/2019/11/0018.jpg",
  bukovytsia: "https://osonnya.com/upload/iblock/557/ukzgg1b6qb3xc0unty1c8mj4seasgnaq.jpg",
  kosyno: "https://kosino.ua/wp-content/uploads/2016/04/land1.jpg",
  sribniTermy: "https://derenivska-kupil.ua/wp-content/uploads/2025/07/dji_0837-2.jpg.pagespeed.ce.Ea_9BE8EEk.jpg",
  zhayvoronok: "https://zhayvoronok.net/wp-content/uploads/2024/12/main-banner-golovna-newyear.webp",
  tepliVody: "http://tepli-vody.com.ua/wp-content/uploads/2018/06/LEV_0092.jpg",
  solotvyno: "img/Solotvino.jpg",
  moreKs: "https://more.ks.ua/Media/pic/logo.jpg"
};

const NAMESPACE = "vidpochynok-site";

let currentPopularSite = null;

async function goToSite(site) {
  window.open(siteUrls[site], "_blank");
}

async function getCount(site) {
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${site}`);
    if (!res.ok) return 0;
    const data = await res.json();
    return data.value;
  } catch (e) {
    return 0;
  }
}

async function updateMostPopular() {
  let maxCount = -1;
  let popularSite = null;

  for (let site in siteUrls) {
    const count = await getCount(site);
    if (count > maxCount) {
      maxCount = count;
      popularSite = site;
    }
  }

  if (!popularSite) return;

  currentPopularSite = popularSite;

  const footer = document.querySelector(".most-popular-footer");
  if (!footer) return;

  footer.querySelector(".popular-site-name").textContent = siteNames[popularSite];
  footer.querySelector(".popular-site-count").textContent = maxCount;
  footer.querySelector(".popular-site-img").src = siteImg[popularSite];
}

updateMostPopular();

