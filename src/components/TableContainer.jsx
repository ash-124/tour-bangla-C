import TableRow from "./TableRow";

const TableContainer = ({ theads, data, refetch }) => {
    return (
        <div className="overflow-x-auto">
            <table className=" w-full text-sm text-white">
                <thead>
                    <tr className="border-b border-[#BFC1CC]/40 text-left">
                        {
                            theads
                                .map((thead, i) =>
                                    <th key={i} className="py-3 px-2" >{thead}</th>

                                )
                        }

                    </tr>
                </thead>

                <tbody>
                    {data?.length === 0 ? (
                        <tr>
                            <td
                                colSpan="7"
                                className="text-center py-10 text-white/70"
                            >
                                No Assigned Tours found
                            </td>
                        </tr>
                    ) : (
                        data?.map((pkg, idx) => (
                            <TableRow
                                key={pkg._id}
                                pkg={pkg}
                                i={idx}
                                refetch={refetch}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableContainer;