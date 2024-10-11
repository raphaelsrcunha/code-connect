const uploadButton = document.getElementById("upload-button");
const inputUpload = document.getElementById("image-upload");
const mainImage = document.querySelector(".main-image");
const imageName = document.querySelector(".container-image-name p");
const inputTags = document.getElementById("input-tags");
const tagsList = document.getElementById("list-tags");
const buttonPost = document.querySelector(".button-post");
const buttonDiscard = document.querySelector(".button-discard");

uploadButton.addEventListener("click", () => {
    inputUpload.click();
})

function readContentFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url : reader.result, fileName: file.name})
        }

        reader.onerror = () => {
            reject(`Error while reading the file ${file.name}`);
        }

        reader.readAsDataURL(file);
    })
}

inputUpload.addEventListener("change", async (evento) => {
    const file = evento.target.files[0];

    if(file) {
        try {
            const fileContent = await readContentFile(file);
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.fileName;
        } catch(error) {
            console.error("Error while reading the file")
        }
    }
})

tagsList.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove-tag")) {
        const tagToRemove = event.target.parentElement;
        tagsList.removeChild(tagToRemove);
    }
})

const availableTags = ["Frontend", "Backend", "Cloud", "OCI", "AWS", "Java", "C#", "Spring"];

async function verifyAvailableTags(tagText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(availableTags.includes(tagText));
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (event) => {
    if(event.key === "Enter") {
        event.preventDefault(); // to avoid to refresh page
        const tagText = inputTags.value.trim();
        if (tagText !== "") {
            try{
                const existsTag = await verifyAvailableTags(tagText);
                if(existsTag) {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagText}</p> <img src="./assets/icons/SVG/close (3).svg" class="remove-tag">`;
                    tagsList.appendChild(newTag);
                    inputTags.value = "";
                } else {
                    alert("Tag was not found")
                }
            } catch (error) {
                console.error("Error");
                alert("erro");
            }
        }
    }
})


buttonPost.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const projectName = document.getElementById("project-name").value;
    const projectDescription = document.getElementById("project-description").value;
    const projectTags = Array.from(tagsList.querySelectorAll("p")).map((tag) => tag.textContent);

    console.log(projectName);
    console.log(projectDescription);
    console.log(projectTags);

    resetForm(evento);

})

function resetForm(evento) {
    evento.preventDefault();

    const form = document.querySelector("form");
    form.reset();

    mainImage.src = "./assets/img-general/gradient-ui-kit-collection_23-2149203472.jpg";
    imageName.textContent = "image_project.png";
}

buttonDiscard.addEventListener("click", resetForm(evento));