export const updateNote = async (id, ibOj, valueForm) => {
    console.log(valueForm);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/note/${id}/${ibOj}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return data;
};

export const find = async (id) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/note/get/${id}`).then((res) =>
        res.json()
    );
    return data;
};
