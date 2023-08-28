import { Form, Formik, FormikProps, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store";
import { addInputs, deleteInputs, toggleCompleted, toggleSelected } from "../store/slice";
import { BsXLg } from "react-icons/bs";
import { useState } from "react";
import { useLocation } from "react-router";
import {BsTrashFill,BsCheck2} from "react-icons/bs"
import { toggleLight } from "../store/lightSlice";
import {BsSunFill} from "react-icons/bs"
import {BsMoonFill} from "react-icons/bs"

interface inputValue {
    inputs: string;
}
  
const initialValues = {
    inputs: "",
};
const validationSchema = Yup.object().shape({
    inputs: Yup.string().required(""),
});

const Home = () => {
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState<boolean[]>([]);
  const [activeButton, setActiveButton] = useState("all");
  const inputData = useAppSelector((state) => state.inputs.content);
  const light = useAppSelector((state) => state.light.light);
  

  const isHover = (itemId:any) => {
    setHover((prevHoverState) => {
      const newState = [...prevHoverState];
      newState[itemId] = !newState[itemId];
      return newState;
    });
  };

  const unSelected = inputData.filter((item) => !item.selected)  //active
  const selectedItems = inputData.filter((item) => item.selected);  //completed
  
  const handleButtonClick = (category:any) => {
    setActiveButton(category);
  };

  const handleClearCompleted = () => {
    const completedTodos = inputData.filter((todo) => todo.selected);
    completedTodos.forEach((todo) => dispatch(deleteInputs(todo.id)));
  };

  const onSubmit = (values: inputValue, { resetForm }: any) => {
    const id = Date.now();
    dispatch(addInputs({ id, content: values.inputs }));
    resetForm();
    console.log("djis");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteInputs(id));
  };

  const completeTodos = (id: number) => {
    dispatch(toggleSelected(id));
    dispatch(toggleCompleted(id));
  };
  const testt = (id: number) => {
    
    dispatch(toggleCompleted(id));
  };

    
    return (
        <div className={`flex flex-col text-[18px] ${light? "bg-white":"bg-primaryBackground"} min-h-screen -mt-[51px]`}>
          <div className="-translate-y-[40px]  self-center ">
            <div className="flex -translate-y-[90px]  md:-translate-y-[50px] md:justify-center  md:space-x-[300px]">
                
                <h1 className="text-white text-[32px]  md:text-[34px] tracking-[8px] md:tracking-[10px] font-extrabold">TODO</h1>
                <div onClick={()=> dispatch(toggleLight())} className="mt-2">
                    {light ? (
                        <BsMoonFill className="text-white text-[28px]"/>
                    ):(
                        <BsSunFill className="text-yellow text-[28px]"/>
                    )}
                </div>
                
            </div>
            <div className="-translate-y-[50px] md:-translate-y-0">

            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
                {(props: FormikProps<inputValue>) => (
                    <Form className="flex">
                        <Field 
                          type="text"
                          name="inputs" 
                          placeholder="Create a new todo..."
                          className={` p-3 rounded-[4px] placeholder:text-base md:placeholder:text-lg w-full max-w-[350px] md:max-w-[480px] ${light?"boxShadow placeholder:text-[#434247] bg-white":
                          "text-[#cacde8]  placeholder:text-[[#cacde8] bg-[#25273c]"}`}
                        />
                        {props.errors.inputs && props.touched.inputs && (
                        <div className="error">{props.errors.inputs}</div>
                        )}
                        <button 
                        type="submit"
                        className={`ml-1 text-base md:text-lg rounded-[4px] p-2 ${light?"boxShadow text-[#434247] bg-white":
                        "text-[#cacde8] placeholder:text-[[#cacde8] bg-[#25273c]"}`}
                        >
                        Add
                        </button>
                    </Form>
                )}
            </Formik>
            <div className={`boxShadow mt-5 border ${light?"border-white":"border-[#25273c]"} rounded-[4px]`}>
              
              {activeButton==="all" &&(
                <div className="z-10 ">
                  {inputData.map((todos,index) => (
                    <div key={todos.id} onClick={() => completeTodos(todos.id)} onTouchStart={() =>isHover(index)} onMouseEnter={() => isHover(index)}
                      onMouseLeave={() => isHover(index)} onTouchEnd={() =>isHover(index)} className={` w-full max-w-[350px] md:min-w-[480px] whitespace-nowrap ma flex justify-between p-3 border-b  ${light?"bg-white border-[#d2d3db]":"flex bg-[#25273c] border-[#4f5472]"}`}>
                      {/* unchecked icon & the todo */}
                      <div className="flex space-x-2">
                        {todos.completed ?
                          <div className="flex font-[900] items-center justify-center shrink-0 l-gradient w-[21px] h-[21px] md:w-[23px] md:h-[23px] rounded-[50px]">
                            <BsCheck2 className=" text-white"/>
                          </div>
                          :
                          <div className="shrink-0 w-[21px] rounded-[50px] h-[21px] border border-[#6c757d] mt-[1.5px]"></div>
                        }
                        <div className={`mt-[2px] md:mt-0 text-base md:text-lg whitespace-normal break-all ${todos.completed ?"text-[#777A92] line-through":"no-underline"} ${light?"text-[#434247]":"text-[#CACDE8]"} `}>
                          
                          {todos.content}
                        </div>
                      </div>
                      {/* trash icon */}
                      <div className={`ml-[50px] trash-button ${hover[index] ? 'show' : ''}`}>
                        {hover[index]&&
                          <div className="pr-2">
                            <BsTrashFill 
                              className={`mt-[3px] ${light?"text-[#434247]":"text-[#4d5066]"}`}
                              onClick={() => handleDelete(todos.id)}
                            />
                          </div>
                          
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeButton==="active" && (
                <div className="">
                  
                    {unSelected.map((todos, index)=>(
                      <div key={todos.id} onClick={() => completeTodos(todos.id)} onTouchStart={() =>isHover(index)} onMouseEnter={() => isHover(index)}
                        onMouseLeave={() => isHover(index)} onTouchEnd={() =>isHover(index)} className={` w-full max-w-[350px] md:min-w-[480px] whitespace-nowrap ma flex justify-between p-3 border-b  ${light?"bg-white border-[#d2d3db]":"flex bg-[#25273c] border-[#4f5472]"}`}>
                          <div className="flex space-x-2">
                            {todos.completed ?
                              <div className="flex font-[900] items-center justify-center shrink-0 l-gradient w-[21px] h-[21px] md:w-[23px] md:h-[23px] rounded-[50px]">
                                <BsCheck2 className=" text-white"/>
                              </div>
                              :
                              <div className="shrink-0 w-[21px] rounded-[50px] h-[21px] border border-[#6c757d] mt-[1.5px]"></div>
                            }
                            <div className={`mt-[2px] md:mt-0 text-base md:text-lg whitespace-normal break-all ${light?"text-[#434247]":"text-[#CACDE8]"} `}>
                              {todos.content}
                            </div>
                          </div>
                          {/* trash icon */}
                          <div className={`ml-[50px] trash-button ${hover[index] ? 'show' : ''}`}>
                            {hover[index] &&
                              <div className="pr-2">
                                <BsTrashFill 
                                  className={`mt-[3px] ${light?"text-[#434247]":"text-[#4d5066]"}`}
                                  onClick={() => handleDelete(todos.id)}
                                />
                              </div>
                            }
                          </div>
                      </div>
                    ))}
                  
                </div>
              )}
            
              {activeButton === "completed" &&(
                <div className="">
                  
                  {selectedItems.map((todos, index)=>(
                    <div key={todos.id} onClick={() => completeTodos(todos.id)} onTouchStart={() =>isHover(index)} onMouseEnter={() => isHover(index)}
                      onMouseLeave={() => isHover(index)} onTouchEnd={() =>isHover(index)} className={` w-full max-w-[350px] md:min-w-[480px] whitespace-nowrap ma flex justify-between p-3 border-b  ${light?"bg-white border-[#d2d3db]":"flex bg-[#25273c] border-[#4f5472]"}`}>
                        <div className="flex space-x-2">
                          {todos.completed ?
                            <div className="flex font-[900] items-center justify-center shrink-0 l-gradient w-[21px] h-[21px] md:w-[23px] md:h-[23px] rounded-[50px]">
                              <BsCheck2 className=" text-white"/>
                            </div>
                            :
                            <div className="shrink-0 w-[21px] rounded-[50px] h-[21px] border border-[#6c757d] mt-[1.5px]"></div>
                          }
                          <div className={`mt-[2px] md:mt-0 whitespace-normal break-all ${todos.completed ?"text-[#777A92] line-through":"no-underline"} ${light?"text-[#434247]":"text-[#CACDE8]"} `}>
                            {todos.content}
                          </div>
                        </div>
                        {/* trash icon */}
                        <div className={`ml-[50px] trash-button ${hover[index] ? 'show' : ''}`}>
                          {hover[index] &&
                            <div className="pr-2">
                              <BsTrashFill 
                                className={`mt-[3px] ${light?"text-[#434247]":"text-[#4d5066]"}`}
                                onClick={() => handleDelete(todos.id)}
                              />
                            </div>
                          }
                        </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={`text-base md:text-lg w-full max-w-[350px] md:min-w-[480px] text-base p-3 flex justify-between ${light?"text-[#4d5066] bg-white":"text-[#99989E] bg-[#25273c]"}`}>
                <div>{unSelected.length} items left </div>
                <div className="hidden md:block space-x-3">
                  <button className={`${activeButton==="all" &&"text-blue"}`} onClick={() =>handleButtonClick("all")}>All</button>
                  <button className={`${activeButton==="active" &&"text-blue"}`} onClick={() => handleButtonClick("active")}>Active</button>
                  <button className={`${activeButton==="completed" &&"text-blue"}`} onClick={() => handleButtonClick("completed")}>Completed</button>
                </div>
                <button onClick={handleClearCompleted}> Clear Completed</button>
              </div>

            </div>
            <div className={`text-base mt-3 text-base block md:hidden w-full max-w-[350px] rounded-[4px] text-base p-3 flex justify-center space-x-3 ${light?"text-[#4d5066] bg-white":"text-[#99989E] bg-[#25273c]"}`}>
              <button className={`${activeButton==="all" &&"text-blue"}`} onClick={() =>handleButtonClick("all")}>All</button>
              <button className={`${activeButton==="active" &&"text-blue"}`} onClick={() => handleButtonClick("active")}>Active</button>
              <button className={`${activeButton==="completed" &&"text-blue"}`} onClick={() => handleButtonClick("completed")}>Completed</button>
            </div>
            </div> 
          </div>
        </div>
    );
}
 
export default Home;