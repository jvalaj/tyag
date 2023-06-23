import React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import data from "./../localData/faqs.json"
const Accordian = () => {
    return (


        <div className="mx-auto w-3/4 my-6 p-2 ">
            <div className="mx-auto w-full rounded-lg bg-blue-100 p-2">
                {
                    data.map((item) => (
                        <Disclosure as="div" className="pb-2">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full transition justify-between rounded-lg bg-blue-300 px-4 py-2 text-left font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>{item.question}</span>
                                        <ChevronDownIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-blue-500`}
                                        />
                                    </Disclosure.Button>
                                    <Transition

                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel className="px-4 pt-4 pb-2  text-gray-500 transition ">
                                            {item.answer}
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ))}


            </div>
        </div>


    )
}
export default Accordian;