export const createTransaction = async (valueForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/transaction/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return res;
};

export const getAllTransaction = async () => {
    const res = (await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/transaction/get-all`)).json(
        (res) => res.json()
    );
    return res;
};

export const getTransaction = async (id) => {
    const res = (await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/transaction/get/${id}`)).json(
        (res) => res.json()
    );
    return res;
};

export const sendNoteToGathering = async (id, idGathering, valueForm) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_APP_URL}/transaction/send-note/${id}/${idGathering}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(valueForm),
        }
    );
    return res;
};

export const sendUpdate = async (id, valueForm) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_APP_URL}/transaction/update-user/${id}`,
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
