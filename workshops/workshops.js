import { 
    checkAuth,
    logout,
    getWorkshops,
    deleteParticipant,
    deleteWorkshop
} from '../script/fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById(`logout`);
logoutButton.addEventListener(`click`, () => {
    logout();
});

const newUser = document.getElementById(`new-participant`);
newUser.addEventListener(`click`, () => {
    window.location.href = `../participant`;
});

const addWorkshop = document.getElementById(`add-workshop`);
addWorkshop.addEventListener(`click`, () => {
    window.location.href = `../add-workshop`;
});

window.addEventListener(`load`, async() => {
    const workshops = await getWorkshops();
    console.log(workshops);
    await displayWorkshops(workshops);
});

async function displayWorkshops(workshops){
    
    const workshopsContainer = document.querySelector(`.workshops-container`);
    workshopsContainer.textContent = ``;

    for (let w of workshops){
        const workshopsDiv = document.createElement(`div`);
        workshopsDiv.classList.add(`workshops-div`);

        const nameTrashDiv = document.createElement(`div`);
        nameTrashDiv.classList.add(`name-trash-div`);

        const workshopsName = document.createElement(`p`);
        workshopsName.classList.add(`workshop-name`);
        workshopsName.textContent = w.name;

        const trash = document.createElement(`p`);
        trash.classList.add(`trash`);
        trash.title = `Delete Workshop`;
        trash.textContent = `🗑️`;

        

        trash.addEventListener(`click`, async() => {
            await deleteWorkshop(w.id);
            console.log(w.id);
            location.reload();
        });

        nameTrashDiv.append(workshopsName, trash);

        const participantsDiv = document.createElement(`div`);
        participantsDiv.classList.add(`participant-div`);

        
        for (let item of w.participants){
            const person = renderParticipant(item);

            person.addEventListener(`click`, async() => {
                await deleteParticipant(item.id);
                location.reload();
            });
            participantsDiv.append(person);

        }
        workshopsDiv.append(nameTrashDiv, participantsDiv);
        workshopsContainer.append(workshopsDiv);
    }
}

export function renderParticipant(participant){
    const person = document.createElement(`p`);
    person.classList.add(`participant`);
    person.textContent = participant.name;

    return person;
}