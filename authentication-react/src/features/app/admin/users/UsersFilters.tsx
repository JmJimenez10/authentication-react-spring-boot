import React, { useState } from 'react'
import { PillCheck } from '../../../../components/Buttons'
import { IoSearch } from 'react-icons/io5'
import useUser from '../../../../hooks/useUser';
import { Input } from '../../../../components/Forms';

export const UsersFilters = () => {
  const [selectedStates, setSelectedStates] = useState<string>("");
  const [search, setSearch] = useState("");

  const states = ["ADMIN", "STAFF", "CUSTOMER"];

  const { handleSearch, handleStateFilter } = useUser();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleChangeState = (state: string) => {
    let newSelection: string;

    if (selectedStates.includes(state))
      newSelection = "";
    else
      newSelection = state;

    setSelectedStates(newSelection);
    handleStateFilter(newSelection);
  };

  return <>
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between">
      <h1 className="text-5xl">Usuarios</h1>
      <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
        <Input type="search" placeholder="Buscar usuario..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="cursor-pointer rounded-sm p-2 text-2xl hover:bg-neutral-300">
          <IoSearch />
        </button>
      </form>
    </div>

    <div className="flex items-center lg:justify-end my-5">
      <div className="flex gap-5">
        {states.map((state) => (
          <PillCheck
            key={state}
            text={state}
            active={selectedStates.includes(state)}
            onClick={() => handleChangeState(state)}
          />
        ))}
      </div>
    </div>
  </>
}
