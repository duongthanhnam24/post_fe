function Input({ name, type, placeholder, value, handleChange = () => {} }) {
    return (
        <>
            <input
                className="p-1 border border-black rounded-md w-[100%] my-3"
                placeholder={placeholder}
                name={name}
                type={type}
                value={value}
                onChange={(e) => handleChange(e.target)}
            />
        </>
    );
}

export default Input;
