import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", Label: "All" },
          { value: "no-discount", Label: "No Discount" },
          { value: "with-discount", Label: "With Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
