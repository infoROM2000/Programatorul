import { writable } from "svelte/store";
import { browser } from "$app/environment";
export class User {
    id: number;
    name: string;
    elo: number = 1000;
    wins: number = 0;
    draws: number = 0;
    lost: number = 0;
    constructor(n: string) {
        this.id = User.generateUID();
        this.name = n;
    }
    static generateUID(): number {
        let id: number;
        do {
            id = Math.floor(Math.random() * 100)
        } while (data.find(e => e.id === id));
        return id;
    }
}
let data: User[] = [];
if (browser) {
    const saved = localStorage.getItem("users");
    data = saved ? JSON.parse(saved) : [];
}
function Users() {
    const { subscribe, set, update } = writable<User[]>(data)
    return {
        subscribe,
        set,
        update,
        push: (e: User) => {
            update(arr => {
                const newUsers = [...arr, e];
                localStorage.setItem("users", JSON.stringify(newUsers));
                return newUsers;
            });
        },
        remove: (e: User) => {
            update(arr => {
                const newUsers = arr.filter(user => user.id !== e.id);
                localStorage.setItem("users", JSON.stringify(newUsers));
                return newUsers;
            });
        },
        sort: (property: string) => {
            const asc = Math.floor(Math.random() * 2) === 0;

            update(arr => {
                const sorted = [...arr];

                const compare = (a: User, b: User) => {
                    if (property === "name") {
                        return a.name.localeCompare(b.name); // Alphabetical order
                    } else if (property === "elo") {
                        return a.elo - b.elo; // Numerical order
                    }
                    return 0; // Default case, no sorting if the property is invalid
                };

                sorted.sort((a, b) => {
                    const comp = compare(a, b);
                    return asc ? comp : -comp;
                });

                return sorted;
            });
        }
    };
}
export const users = Users();