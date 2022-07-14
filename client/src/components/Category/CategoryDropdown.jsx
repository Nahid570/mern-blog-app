import Select from "react-select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoryAction } from "../../redux/slices/category/categorySlices";

const CategoryDropdown = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoryAction());
  }, [dispatch]);

  const state = useSelector((state) => state?.category);
  const { categoryList } = state;

  const allCategories = categoryList?.map(category => {
    return {
        label: category?.title,
        value: category?._id,
    }
  })

  const handleChange = value => {
    props.onChange("category", value);
  }

  const handleBlur = () => {
    props.onBlur("category", true);
  }
  
  return (<>
    <Select id="category" options={allCategories} onChange={handleChange} onBlur={handleBlur} value={props?.value?.label}/>
    {props?.errors && props?.touched ? <p className="text-red-500">{props?.errors}</p> : null}
  </>)
};

export default CategoryDropdown;
