import { getUser, IUser } from "./User.service";

export interface IAgent {
    agentId: string;
    user: IUser;
}

const LOCAL_STORAGE_AGENT: string = 'real-tour-agent';

export const getAgent = (): IAgent => {
    const agentString = localStorage.getItem(LOCAL_STORAGE_AGENT);
    if (agentString) return JSON.parse(agentString);
    return {
        agentId: '',
        user: getUser()
    };
}

export const setAgent = (agent: IAgent) => {
    localStorage.setItem(LOCAL_STORAGE_AGENT, JSON.stringify(agent));
}