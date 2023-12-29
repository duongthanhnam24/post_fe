import axios from "axios";

export const axiosJWT = axios.create();

export const GetDetailUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.NEXT_PUBLIC_API_APP_URL}/users/profile/${id}`,
            {
                headers: {
                    token: `${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const rf = async (refresh_token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/refresh`, {
        method: "POST",
        headers: {
            refresh: `${refresh_token}`,
        },
    });
    const data = await res.json();
    return data;
};

// tạo tài khoản
export const createAccount = async (valueForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return res;
};

export const signIn = async (valueForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valueForm),
    }).then((res) => res.json());
    return res;
};
// lấy tất cả tài khoản
export const getAllUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_APP_URL}/users/all`).then((res) =>
        res.json()
    );
    return res;
};
