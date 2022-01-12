import { 
    checkAuth,
    logout,
    getWorkshops
} from '../script/fetch-utils.js';

const logoutButton = document.getElementById(`logout`);
logoutButton.addEventListener(`click`, () => {
    logout();
});

const newUser = document.getElementById(`new-participant`);
newUser.addEventListener(`click`, () => {
    window.location.href = `../participant`;
});

window.addEventListener(`load`, async() => {
    const workshops = await getWorkshops();
    console.log(workshops);
    await displayWorkshops(workshops);
});

async function displayWorkshops(workshops){
    
    const workshopsContainer = document.querySelector(`.workshops-container`);

    for (let w of workshops){
        const workshopsDiv = document.createElement(`div`);
        workshopsDiv.classList.add(`workshops-div`);
        const workshopsName = document.createElement(`p`);
        workshopsName.classList.add(`workshop-name`);
        const participantsDiv = document.createElement(`div`);
        participantsDiv.classList.add(`participant-div`);
        workshopsName.textContent = w.name;
        for (let item of w.participants){
            console.log(item.name);
        }
        workshopsDiv.append(workshopsName, participantsDiv);
        workshopsContainer.append(workshopsDiv);
    }
}