const baseURL = "http://localhost:8000";


export async function createNewProject(projectData) {
    try {
        const response = await fetch(
            `${baseURL}/api/projects`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            },
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}

export async function createNewComment({project_id, comment}) {
    const commentData = {
        project_id,
        comment,
    };
    try {
        const response = await fetch(
            `${baseURL}/api/projects/${project_id}/comments/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            },
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
