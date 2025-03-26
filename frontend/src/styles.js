const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",
    heading: "font-poppins font-bold sm:text-[32px] text-[40px] text-graydarkest w-full",
    subHeading:"font-poppins font-normal font-[20px] text-graydarker",
    paragraph: "font-poppins font-medium text-graydark text-[16px] leading-[30.8px]",
    title: "font-poppins font-medium font-[24px] text-black font-semibold",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "px-14 lg:px-[102px] ",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",
  
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",
  };
  
  export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  };
  
  export default styles;