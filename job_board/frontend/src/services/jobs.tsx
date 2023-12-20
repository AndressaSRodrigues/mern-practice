import { JobCardProps } from '../interfaces/JobCardProps';
import { JobDetailsProps } from '../interfaces/JobDetailsProps';

const URL = 'http://localhost:3000/';

export const getJobs = (): Promise<JobCardProps[]> => {
    return fetch(`${URL}jobs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<JobCardProps[]>;
        })
        .catch(() => {
            throw new Error();
        });
};

export const getJobDetails = (id: string): Promise<JobDetailsProps> => {
    return fetch(`${URL}job/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<JobDetailsProps>;
        })
        .catch(() => {
            throw new Error();
        });
};

export const postNewJob = async (
    token: string,
    title: string,
    level: string,
    company: string,
    location: string,
    salary: string,
    description: string,
    modality: string,
    startDate: string,
): Promise<JobDetailsProps> => {
    return fetch(`${URL}job`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },        
        body: JSON.stringify({
            title: title,
            level: level,
            company: company,
            location: location,
            salary: salary,
            description: description,
            modality: modality,
            startDate: startDate,
        })
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<JobDetailsProps>;
        })
        .catch((error) => {
            console.error(error)
            throw new Error('Unable to post job');
        });
};