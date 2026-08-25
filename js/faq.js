/* =========================================================
   LOAN SUVIDHA
   FAQ PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =========================================================
  // 1. FAQ ACCORDION
  // =========================================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        // Close all FAQ items in the same category
        const parentGroup = item.closest(".faq-category-group");
        if (parentGroup) {
          const allItems = parentGroup.querySelectorAll(".faq-item");
          allItems.forEach(function (otherItem) {
            otherItem.classList.remove("active");
          });
        }

        // Toggle clicked item
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // =========================================================
  // 2. CATEGORY FILTER
  // =========================================================

  const categoryButtons = document.querySelectorAll(".faq-category-btn");
  const categoryGroups = document.querySelectorAll(".faq-category-group");

  categoryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");

      const selectedCategory = this.dataset.category;

      // Show/hide categories
      categoryGroups.forEach(function (group) {
        const groupCategory = group.dataset.category;

        if (selectedCategory === "all") {
          group.style.display = "block";
        } else if (groupCategory === selectedCategory) {
          group.style.display = "block";
        } else {
          group.style.display = "none";
        }
      });

      // Reset search
      const searchInput = document.getElementById("faqSearch");
      if (searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
      }

      // Hide no results
      const noResults = document.getElementById("faqNoResults");
      if (noResults) {
        noResults.style.display = "none";
      }
    });
  });

  // =========================================================
  // 3. SEARCH FILTER
  // =========================================================

  const searchInput = document.getElementById("faqSearch");
  const noResults = document.getElementById("faqNoResults");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      let hasVisibleItems = false;

      // Get currently visible categories
      const visibleGroups = document.querySelectorAll(
        '.faq-category-group[style*="display: block"], .faq-category-group:not([style*="display: none"])',
      );

      // If no style attribute, all are visible
      let activeGroups = [];
      categoryGroups.forEach(function (group) {
        if (group.style.display !== "none") {
          activeGroups.push(group);
        }
      });

      if (activeGroups.length === 0) {
        activeGroups = categoryGroups;
      }

      activeGroups.forEach(function (group) {
        const items = group.querySelectorAll(".faq-item");
        let groupHasMatch = false;

        items.forEach(function (item) {
          const questionText =
            item.querySelector(".faq-question")?.textContent?.toLowerCase() ||
            "";
          const answerText =
            item.querySelector(".faq-answer")?.textContent?.toLowerCase() || "";

          if (searchTerm === "") {
            item.style.display = "";
            groupHasMatch = true;
          } else if (
            questionText.includes(searchTerm) ||
            answerText.includes(searchTerm)
          ) {
            item.style.display = "";
            groupHasMatch = true;
          } else {
            item.style.display = "none";
          }
        });

        // Hide group if no matching items
        if (searchTerm !== "") {
          if (groupHasMatch) {
            group.style.display = "block";
            hasVisibleItems = true;
          } else {
            group.style.display = "none";
          }
        } else {
          // Reset visibility based on category filter
          const activeCategory = document.querySelector(
            ".faq-category-btn.active",
          );
          if (activeCategory) {
            const cat = activeCategory.dataset.category;
            if (cat === "all" || group.dataset.category === cat) {
              group.style.display = "block";
            } else {
              group.style.display = "none";
            }
          }
          hasVisibleItems = true;
        }
      });

      // Show/hide no results
      if (noResults) {
        if (searchTerm !== "" && !hasVisibleItems) {
          noResults.style.display = "block";
        } else {
          noResults.style.display = "none";
        }
      }
    });
  }

  // =========================================================
  // 4. OPEN FIRST FAQ ITEM BY DEFAULT
  // =========================================================

  const firstItem = document.querySelector(".faq-item");
  if (firstItem && !firstItem.classList.contains("active")) {
    firstItem.classList.add("active");
  }

  // =========================================================
  // 5. CONSOLE LOG
  // =========================================================

  console.log(
    "%c FAQ Page Loaded Successfully ✅ ",
    "background:#0754a5;color:#fff;padding:8px 15px;border-radius:5px;font-weight:bold;",
  );
});
