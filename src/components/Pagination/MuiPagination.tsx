import { Pagination, styled } from "@mui/material";

interface Props {
  count?: number;
  page?: number;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  handleChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}
const StyledPagination = styled(Pagination)`
  & .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected {
    background-color: #f4eaff;
    font-family: "Rubik, sans-serif";
  }
`;

const MuiPagination = (props: Props) => {
  const { count, page, handleChange, hideNextButton, hidePrevButton } = props;
  return (
    <>
      <StyledPagination
        count={count}
        page={page}
        hideNextButton={hideNextButton}
        hidePrevButton={hidePrevButton}
        onChange={handleChange}
        shape="rounded"
      />
    </>
  );
};
export default MuiPagination;
