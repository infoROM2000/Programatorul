import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { PlayerStore } from "./Player";

interface Option {
    value: string;
    description: string;
}
export const tournamentType: Option[] = [
    { value: "cup", description: "Cupa" },
    { value: "swiss", description: "Swiss" },
    { value: "roundrobin", description: "Campionat" },
];
export const matchingAlgorithm: Option[] = [
    { value: "random", description: "Aleator" },
    { value: "sameElo", description: "Valori apropiate" },
    { value: "differentElo", description: "Dezechilibrat" },
];
export class Session {
    K: number = 20;
    finished: boolean = false;
    type: string = "";
    players: PlayerStore = [];
    size: number = 0;
    date: string = Date();
    winner: PlayerStore = [];
    constructor(type: string, players: PlayerStore) {
        type = type
        players = players
    }
}
export class SessionStore {
    private static store = writable<Session[]>([]);
    static initialize() {
        if (browser) {
            const saved = localStorage.getItem("sessions");
            const sessions = saved ? JSON.parse(saved) : [];
            this.store.set(sessions);
        }
    }

    // Subscribe to the store
    static subscribe = this.store.subscribe;

    static getSessions() {
        let sessions: Session[] = [];
        this.store.subscribe(value => sessions = value)();
        return sessions;
    }
    static push(session: Session) {
        this.store.update(sessions => {
            const newSessions = [...sessions, session];
            localStorage.setItem("players", JSON.stringify(newSessions));  // Persist in localStorage
            return newSessions;
        });
    }

    // Sort players based on a specific property
    static sort(property: string) {
        const asc = Math.floor(Math.random() * 2) === 0;
    }
}
function powerof2(n: number) {
    return n > 1 && (n & (n - 1)) === 0;
}
// Initialize the PlayerStore when the app starts
SessionStore.initialize();
export let selectedTournamentType: string;
export let selectedMatchingAlgorithm: string;