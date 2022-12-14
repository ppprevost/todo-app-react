export const sortOptions = ["ascending", "descending"];

export const sortData = <F extends {created_at:Date}> (role = 0, data:F[]) => {

    return data
        ? data.sort((a, b) => {
            if (sortOptions[role] === "ascending") {
                return (
                    new Date(a["created_at"]).getTime() -
                    new Date(b["created_at"]).getTime()
                );
            }
            return (
                new Date(b["created_at"]).getTime() -
                new Date(a["created_at"]).getTime()
            );
        })
        : [];
};