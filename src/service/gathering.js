export const Gathering = async (valueForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return res;
};

export const AllGathering = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/all`, {}).then(
        (res) => res.json()
    );
    return res;
};

export const GetOneGathering = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/get/${id}`).then(
        (res) => res.json()
    );
    return res;
};
export const update = async (id, valueForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/update/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return res;
};

export const addNote = async (id, valueForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/add-note/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return res;
};
export const sendNote = async (id, gathering, valueForm) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/send-note/${id}/${gathering}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(valueForm),
        }
    ).then((res) => res.json());
    return res;
};
export const sendToGatherings = async (id, gathering, valueForm) => {
    console.log(id);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_APP_URL}/gathering/send-gathering/${id}/${gathering}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(valueForm),
        }
    ).then((res) => res.json());
    return res;
};
