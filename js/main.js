(() => {
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const partsInfo = document.querySelector("#parts-info")

 
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infobox => {
        infobox.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          
          const imgElement = document.createElement('img');
          imgElement.src = `images/${infoBox.thumbnail}`;

          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;

          selected.appendChild(imgElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch(failure => console.error(failure));
  }

  function loadMaterialInfo() {
    
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        materials.forEach(materialPart => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = materialPart.heading;

          const materialDesc = clone.querySelector(".material-description");
          materialDesc.textContent = materialPart.description;

          materialList.appendChild(clone);
        });

        partsInfo.innerHTML = "";
        partsInfo.appendChild(materialList);
      })
      .catch(error => console.error(error));
  }

  loadMaterialInfo();
  loadInfoBoxes();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
