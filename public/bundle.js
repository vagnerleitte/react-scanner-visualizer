(() => {
  if (!self.fetch) {
    throw new Error("Vai ter que usar XMLHTTPRequest. u.u");
  }
  const components = [];
  let details = undefined;

  fetch("/api/v1/components/component-usage.json")
    .then((response) => response.json())
    .then((content) => {
      components.push.apply(components, content);
      generateComponentList();
    });

  const generateComponentList = async () => {
    const list = document.getElementById("component-list");

    if (!list) {
      throw new Error("vish, onde eu coloco isso?");
    }

    if (components.length > 0) {
      await components.map((component) => {
        itemList = document.createElement("li");
        itemList.classList.add(
          "flex",
          "shadow-sm",
          "rounded-lg",
          "bg-gray-700",
          "p-3",
          "text-white"
        );

        itemList.addEventListener("click", () => loadDetails(component.id));
        itemList.innerHTML = `<p>${component.name}</p>`;
        list.appendChild(itemList);
      });
    }
  };

  const loadDetails = async (id) => {
    const childList = document.getElementById("child-list");

    await fetch(`/api/v1/component/${id}`)
      .then((response) => response.json())
      .then((content) => {
        details = content;
        console.log(details);
      });

    console.log(details);

    if (details) {
      detailItemList = document.createElement("li");
      detailItemList.classList.add(
        "flex",
        "shadow-sm",
        "rounded-lg",
        "bg-gray-200",
        "overflow-hidden"
      );

      detailItemList.innerHTML = `<a href="#" class="block p-5 hover:bg-gray-50">
        <h2>Component: <b> ${details.name}</b></h2>
        <br/>
        <h6><b>Used</b></h6>
        <hr />
          ${details.childs.map(
            (c) => `
            <div class="flex">
              <div class="mr-4 flex-shrink-0">
                <svg class="h-16 w-16 border border-gray-300 bg-white text-gray-300" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200" aria-hidden="true">
                  <path vector-effect="non-scaling-stroke" stroke-width="1" d="M0 0l200 200M0 200L200 0" />
                </svg>
              </div>
              <div>
                <span class="text-lg font-bold" title="${c.imported_path}">Path: ${c.imported_path}</span>
                <p class="mt-1">Line: ${c.line}</p>
                <p class="mt-1">Column: ${c.column}</p>
              </div>
            </div>
          `
          )}

      </a>`;
      childList.innerHTML = "";
      childList.appendChild(detailItemList);
    }
  };
})();
