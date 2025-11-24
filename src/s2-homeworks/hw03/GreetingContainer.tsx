import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: UserType['name']) => void
}

export const pureAddUser = (
    name: string,
    setError: (e: string) => void,
    setName: (v: string) => void,
    addUserCallback: (name: string) => void
) => {
    if (name.trim().length === 0) {
        setError('Please enter a valid name')
    } else {
        addUserCallback(name.trim())
        setName('')
    }
}

export const pureOnBlur = (name: string, setError: (e: string) => void) => {
    if (name.trim().length === 0) {
        setError('Please enter a valid name')
    }
}

export const pureOnEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    addUser: () => void
) => {
    if (e.key === 'Enter') {
        addUser()
    }
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({ users, addUserCallback }) => {

    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        error && setError('')
    }

    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users.length > 0 ? users[users.length - 1].name : ''

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer