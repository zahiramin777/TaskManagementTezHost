import React from 'react'

const Header = () => {
  return (
    <div >
        <table id="todo_table" class="table w-20">
                    <thead>
                        <tr>
                            <th class="text-center px-1 py-2 bg-orange-500 text-orange-100 rounded-tl-xl">#</th>
                            <th class="text-left px-1 py-2 bg-orange-500 text-orange-100">Details</th>
                            <th class=" px-1 py-2 bg-orange-500 text-orange-100 rounded-tr-xl">Action</th>
                        </tr>
                    </thead>
     </table>
    </div>
  )
}

export default Header