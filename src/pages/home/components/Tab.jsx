"use client"

function Tab(props) {
  const handleClick = (e) => {
    props.onTabClick(props._id)
  }

  if (props._id === props.selectedCategoryId) {
    return (
      <button className="border-2 border-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 font-medium transition-all duration-300 shadow-sm">
        {props.name}
      </button>
    )
  }

  return (
    <button
      className="border border-gray-200 px-4 py-2 rounded-full hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300"
      onClick={handleClick}
    >
      {props.name}
    </button>
  )
}

export default Tab
