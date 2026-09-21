/**
 * Минимальный i18n-слой. Заполнен только "ru" — казахский и английский
 * добавляются позже без переверстки: достаточно заполнить словари ниже,
 * переключатель и data-i18n-разметка в index.html уже готовы.
 * Пока словарь языка пуст, applyTranslations() оставляет русский текст.
 */
(function () {
  "use strict";

  var translations = {
    ru: {
      "nav.services": "Услуги",
      "nav.whenNeeded": "Когда нужна оценка",
      "nav.projects": "Проекты",
      "nav.useful": "Полезное",
      "nav.partners": "Партнёрам",
      "nav.about": "О компании",
      "nav.contacts": "Контакты",
      "nav.status": "Статус заказа",
      "nav.openMenu": "Открыть меню",
      "nav.closeMenu": "Закрыть меню",

      "hero.eyebrow": "Эксперты по оценке имущества и интеллектуальной собственности",
      "hero.title": "Оценка, которой доверяют банки, суды и собственники.",
      "hero.subtitle": "С нами надёжно: отчёты, подготовленные нашими специалистами, полностью соответствуют законодательству и стандартам Республики Казахстан и международным нормам МСФО (IAS, IFRS).",
      "hero.ctaPrimary": "Оставить заявку",
      "hero.ctaSecondary": "Узнать статус заказа",

      "stats.reportsLabel": "Live · по данным реестра",
      "stats.reportsCaption": "Отчётов об оценке подготовлено",
      "stats.experienceValue": "13 лет",
      "stats.experienceCaption": "Средний опыт специалистов компании",
      "stats.insuranceValue": "21 625 000 ₸",
      "stats.insuranceCaption": "Страхование ответственности каждого специалиста",

      "services.heading": "Услуги",
      "services.groupRealEstate": "Недвижимость",
      "services.groupTransport": "Транспорт и оборудование",
      "services.groupBusiness": "Бизнес и активы",
      "services.item1": "Оценка недвижимого имущества и земельных участков",
      "services.item2": "Оценка производственного оборудования и технологических комплексов",
      "services.item3": "Оценка транспортных средств и специализированной техники",
      "services.item4": "Оценка основных средств, запасов и товаров в обороте",
      "services.item5": "Оценка бизнеса (доли участия)",
      "services.item6": "Оценка нематериальных активов",
      "services.item7": "Оценка ценных бумаг",
      "services.item8": "Оценка убытков и упущенной коммерческой выгоды",

      "projects.heading": "Реализованные проекты",
      "projects.subtitle": "Часть проектов, выполненных специалистами компании.",
      "projects.p1.sector": "Энергетика",
      "projects.p1.client": "АО «KEGOC»",
      "projects.p1.desc": "Оценка справедливой стоимости основных средств для МСФО и 100% пакета акций для IPO.",
      "projects.p2.sector": "Космическая отрасль",
      "projects.p2.client": "АО «НК «Қазақстан Ғарыш Сапары»»",
      "projects.p2.desc": "Оценка недвижимого имущества и стартовых комплексов космодрома «Байконур».",
      "projects.p3.sector": "Нефтегазовая отрасль",
      "projects.p3.client": "ТОО «ҚазМұнайГаз Өнімдері»",
      "projects.p3.desc": "Оценка имущественных комплексов АЗС и нефтебаз в 14 регионах Казахстана.",
      "projects.p4.sector": "Транспорт",
      "projects.p4.client": "АО «КазТрансГаз»",
      "projects.p4.desc": "Оценка полного автопарка компании.",
      "projects.p5.sector": "Железнодорожный транспорт",
      "projects.p5.client": "АО «Локомотив»",
      "projects.p5.desc": "Оценка основных средств и долей участия в дочерних и зависимых организациях.",
      "projects.p6.sector": "Горнорудная отрасль",
      "projects.p6.client": "АО «Майкайынзолото»",
      "projects.p6.desc": "Оценка доли участия.",

      "useful.heading": "Полезное",
      "useful.body": "Раздел готовится: аналитика по оценке, разъяснения законодательства и новости компании появятся здесь при готовности контент-плана.",

      "about.heading": "Команда профессиональных оценщиков и экспертов в сфере оценки",
      "about.body": "Под руководством директора-оценщика Баймолдина Бакытжана Нуржановича. Средний опыт специалистов компании — 13 лет. Оценочная деятельность ведётся в соответствии с законодательством Республики Казахстан и стандартами оценки.",
      "about.point1": "Квалификационные свидетельства оценщика у каждого специалиста",
      "about.point2": "Наши оценщики — члены палат оценщиков Казахстана",
      "about.point3": "Ответственность каждого специалиста застрахована на 21 625 000 ₸",
      "about.point4": "Положительный аудит отчётов сотрудников компании у крупнейших аудиторов (Deloitte Touche Tohmatsu, PricewaterhouseCoopers, Ernst & Young, KPMG)",
      "about.point5": "Статус заказа отслеживается онлайн — без логина и пароля",

      "contact.heading": "Контакты",
      "contact.addressLabel": "Адрес",
      "contact.address": "г. Астана, пр. Тұран, 1",
      "contact.phoneLabel": "Телефон",
      "contact.mobileLabel": "Моб.",
      "contact.emailLabel": "Email",
      "contact.mapPlaceholder": "Карта появится здесь",

      "footer.tagline": "Эксперты по оценке любого имущества и интеллектуальной собственности.",
      "footer.servicesHeading": "Услуги",
      "footer.companyHeading": "Компания",
      "footer.resourcesHeading": "Ресурсы",
      "footer.privacy": "Политика конфиденциальности",
      "footer.staffLogin": "Вход для сотрудников",
      "footer.copyright": "© 2026 ТОО «Tauman Partners»"
    },
    kk: {},
    en: {}
  };

  function applyTranslations(lang) {
    var dict = translations[lang] || {};
    var fallback = translations.ru;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var text = dict[key] || fallback[key];
      if (text) el.textContent = text;
    });
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-current", btn.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });
  }

  function initLangSwitch() {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTranslations(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangSwitch();
    applyTranslations("ru");
  });
})();
