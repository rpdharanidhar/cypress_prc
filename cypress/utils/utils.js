export class customFunctions {
    static get_names_with_timestamp(string) {
        let updated_string;
        const getCurrentTime = () =>
            new Date()
                .toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
                .replace(/[/,:]/g, "_");
        updated_string = string.concat("_", getCurrentTime());
        return updated_string;
    }
    static get_First_name() {
        const random_name = [
            "John",
            "Emma",
            "Michael",
            "Sophia",
            "William",
            "Olivia",
            "James",
            "Ava",
            "Alexander",
            "Isabella",
            "Daniel",
            "Mia",
            "Matthew",
            "Charlotte",
            "Ethan",
            "Amelia",
            "David",
            "Harper",
            "Joseph",
            "Evelyn",
        ];
        const first_name =
            random_name[Math.floor(Math.random() * random_name.length)];
        return first_name;
        //cy.xpath("//tr[td[1]/label[text()='First Name']]/td[2]//input").type(first_name)
    }
    static get_Last_name() {
        const random_last_name = [
            "Smith",
            "Johnson",
            "Williams",
            "Jones",
            "Brown",
            "Davis",
            "Miller",
            "Wilson",
            "Moore",
            "Taylor",
            "Anderson",
            "Thomas",
            "Jackson",
            "White",
            "Harris",
            "Martin",
            "Thompson",
            "Garcia",
            "Martinez",
            "Robinson",
        ];
        const last_name =
            random_last_name[
                Math.floor(Math.random() * random_last_name.length)
            ];
        return last_name;
        //cy.xpath("//tr[td[1]/label[text()='Last Name']]/td[2]//input").type(last_name);
    }
    static get_Email() {
        const domains = [
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com",
            "icloud.com",
            "aol.com",
        ];
        const random_domain =
            domains[Math.floor(Math.random() * domains.length)];
        // const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}${Math.floor(Math.random() * 1000)}@${random_domain}`;
        return "exmpale@gmail.com";
        //cy.xpath("//tr[td[1]/label[text()='Email']]/td[2]//input").type(email);
    }
    static get_9_digit_number() {
        return Math.floor(100000000 + Math.random() * 900000000);
    }

    static get__current_date() {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        let formattedDate = month + "/" + day + "/" + (year % 100);

        console.log(formattedDate);
        return formattedDate;
    }
    static fill_address_name() {
        const names = [
            "John Doe",
            "Jane Smith",
            "Michael Johnson",
            "Emily Brown",
            "David Davis",
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        cy.log(randomName);
        return randomName;
    }
    static getTodaysDate() {
        const date = new Date();
        const month = date.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
        const day = date.getDate();
        const year = date.getFullYear().toString().substr(-2); // get the last two digits of the year
        const today_date = `${month}/${day}/${year}`;
        return today_date;
    }
    static get_future_date() {
        const date = new Date();
        const month = date.getMonth();
        const day = date.getMonth();
        const year = Number(date.getFullYear().toString().substr(-2)) + 1;
        const future_date = `${month}/${day}/${year + 11}`;
        return future_date;
    }
}
