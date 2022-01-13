import { 
    checkAuth,
    logout,
    getWorkshops,
    createParticipant
} from '../script/fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById(`logout`);
logoutButton.addEventListener(`click`, () => {
    logout();
});

const participantForm = document.getElementById(`new-participant`);
participantForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();

    const data = new FormData(participantForm);
    const name = data.get(`name`);
    const workshop_id = data.get(`workshops`);

    await createParticipant({
        name, 
        workshop_id
    });

    participantForm.reset();
    window.location.href = `../workshops`;
});

const viewWorkshops = document.getElementById(`view-workshops`);
viewWorkshops.addEventListener(`click`, () => {
    window.location.href = `../workshops`;
});

window.addEventListener(`load`, async() => {
    const workshops = await getWorkshops();
    const workshopsDropdown = document.getElementById(`workshops-dropdown`);

    for (let w of workshops){
        const option = document.createElement(`option`);
        option.value = w.id;
        option.textContent = w.name;
        workshopsDropdown.append(option);
    }
});