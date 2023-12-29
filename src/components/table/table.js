function Table({ children }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto min-h-[10px] mt-1">
            {children}
        </table>
    );
}

export default Table;
