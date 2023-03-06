const Manager = require("./starter/lib/Manager");
const Engineer = require("./starter/lib/Engineer");
const Intern = require("./starter/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./starter/src/page-template");

// Define an array to hold the team members
const teamMembers = [];

// Define a function to ask for information about the manager
function promptManager() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the manager?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the manager?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the email of the manager?',
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the manager?',
      },
    ]);
  }

  // Define a function to ask for information about an engineer
function promptEngineer() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the engineer?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the engineer?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the email of the engineer?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the GitHub username of the engineer?',
      },
    ]);
  }

  // Define a function to ask for information about an intern
function promptIntern() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the intern?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the intern?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the email of the intern?',
      },
      {
        type: 'input',
        name: 'school',
        message: 'What is the school of the intern?',
      },
    ]);
  }

  // Define a function to prompt the user for the next team member
function promptNextTeamMember() {
  return inquirer.prompt([
      {
          type: 'confirm',
          name: 'addTeamMember',
          message: 'Do you want to add another team member?',
          default: false,
      }
  ]).then((response) => {
      if (response.addTeamMember) {
          return inquirer.prompt([
              {
                  type: 'list',
                  name: 'role',
                  message: 'What is the role of the team member?',
                  choices: ['Engineer', 'Intern'],
              }
          ]).then((response) => {
              if (response.role === 'Engineer') {
                  return promptEngineer().then((response) => {
                      const engineer = new Engineer(response.name, response.id, response.email, response.github);
                      teamMembers.push(engineer);
                      return promptNextTeamMember();
                  });
              } else if (response.role === 'Intern') {
                  return promptIntern().then((response) => {
                      const intern = new Intern(response.name, response.id, response.email, response.school);
                      teamMembers.push(intern);
                      return promptNextTeamMember();
                  });
              }c
          });
      }
  });
}

// Call the promptManager() function to gather information about the manager
promptManager().then((response) => {
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    teamMembers.push(manager);
    return promptNextTeamMember();
}).then(() => {
    // Render the team HTML file
    const renderedHTML = render(teamMembers);
    // Write the rendered HTML to the output file
    fs.writeFile(outputPath, renderedHTML, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Successfully generated ${outputPath}`);
        }
    });
}).catch((error) => {
    console.error(error);
});
 