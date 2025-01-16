import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Player class definition
export class Player {
    id: number;
    name: string;
    elo: number = 1000;
    wins: number = 0;
    draws: number = 0;
    lost: number = 0;

    constructor(n: string) {
        this.id = Player.generateUID();
        this.name = n;
    }

    private static generateUID(): number {
        let id: number;
        do {
            id = Math.floor(Math.random() * 100);
        } while (PlayerStore.getPlayers().find(e => e.id === id));  // Ensure unique IDs
        return id;
    }
}

// The Svelte store for managing the player list
export class PlayerStore {
    private static store = writable<Player[]>([]);

    // Initialize the store with data from localStorage (if available)
    static initialize() {
        if (browser) {
            const saved = localStorage.getItem("players");
            const players = saved ? JSON.parse(saved) : [];
            this.store.set(players);
        }
    }

    // Subscribe to the store
    static subscribe = this.store.subscribe;

    // Get players from the store
    static getPlayers() {
        let players: Player[] = [];
        this.store.subscribe(value => players = value)();
        return players;
    }

    // Add a new player to the store
    static push(player: Player) {
        this.store.update(players => {
            const newPlayers = [...players, player];
            localStorage.setItem("players", JSON.stringify(newPlayers));  // Persist in localStorage
            return newPlayers;
        });
    }

    // Remove a player from the store
    static remove(player: Player) {
        this.store.update(players => {
            const newPlayers = players.filter(p => p.id !== player.id);
            localStorage.setItem("players", JSON.stringify(newPlayers));  // Persist in localStorage
            return newPlayers;
        });
    }

    // Sort players based on a specific property
    static sort(property: string) {
        const asc = Math.floor(Math.random() * 2) === 0;

        this.store.update(players => {
            const sorted = [...players];
            sorted.sort((a, b) => {
                let compare = 0;
                if (property === "name") {
                    compare = a.name.localeCompare(b.name);
                } else if (property === "elo") {
                    compare = a.elo - b.elo;
                }

                return asc ? compare : -compare;
            });
            return sorted;
        });
    }
}

// Initialize the PlayerStore when the app starts
PlayerStore.initialize();
