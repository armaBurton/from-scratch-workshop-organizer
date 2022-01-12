import { 
    checkAuth,
    logout,
    addWorkshop
} from '../script/fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById(`logout`);
logoutButton.addEventListener(`click`, () => {
    logout();
});

const viewWorkshops = document.getElementById(`view-workshops`);
viewWorkshops.addEventListener(`click`, () => {
    window.location.href = `../workshops`;
});

const workshopForm = document.getElementById(`add-workshop`);
workshopForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();

    const data = new FormData(workshopForm);
    const name = data.get(`name`);

    console.log(name);

    await addWorkshop(name);

    workshopForm.reset();
    window.location.href = `../workshops`;
});