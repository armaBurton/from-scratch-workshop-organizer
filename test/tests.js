// import
// {
//     renderParticipant
// } from '../workshops/workshops.js';


const test = QUnit.test;

const participant = {
    id: 13,
    name: 'King Tut',
    user_id: '0a70fdc3-f132-46ff-a821-2789d1830db6',
    workshop_id: 1
};

//When trying to import the function from workshops.js I get this error
//      Uncaught ReferenceError: supabase is not defined 
//when I add <script defer src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script> the test loads my `../workshop/index.html` and I can't get back to the test unless I open another live server

//the work around I found is to copy and paste the function into the test

export function renderParticipant(participant){
    const person = document.createElement(`p`);
    person.classList.add(`participant`);
    person.textContent = participant.name;

    return person;
}

test('renderParticipant should return a DOM element', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = `<p class="participant">King Tut</p>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});