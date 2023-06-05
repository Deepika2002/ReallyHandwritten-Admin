import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import Image from 'next/image'
import { } from '@heroicons/react/24/outline'

import {
  ArrowPathIcon,
  CloudArrowUpIcon, 
  FingerPrintIcon, 
  LockClosedIcon,
  Bars3Icon,
  HeartIcon,
  LinkIcon,
  ChevronDoubleUpIcon,
  MegaphoneIcon,
  ArrowPathRoundedSquareIcon,
  PencilSquareIcon,
  InboxArrowDownIcon,
  UserGroupIcon,
  UsersIcon,
  CheckIcon,
  XMarkIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const footerNavigation = {
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/Really-Handwritten-117171281322527',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}
const stats = [
  { id: 1, name: 'Increased Response Rate', value: '500%' },
  { id: 2, name: 'Open Rates', value: '99%' },
  { id: 3, name: 'Increased Client Spend', value: '18%' },
  { id: 4, name: 'Increase in Referrals', value: '600%' },
]
const mainFeatures = [
  {
    name: 'Personalization and Emotional Connection',
    description:
      'Handwritten letters provide an opportunity to create a personal and emotional connection with customers. Customers feel valued and appreciated when they receive a handwritten letter, and this can increase their loyalty to the brand.',
    icon: LinkIcon,
  },
  {
    name: 'Higher Response Rates',
    description:
      'Handwritten letters have been shown to have a higher response rate than traditional printed letters or digital communications. This increased response rate can translate into higher sales, customer loyalty, and better ROI for the business.',
    icon: ChevronDoubleUpIcon,
  },
  {
    name: 'Differentiation and Brand Awareness',
    description:
      'Handwritten letters are a unique and memorable way to communicate with customers. When done well, they can help to differentiate a brand and create a positive impression in the minds of customers. This can help to build brand awareness and increase the chances of repeat business.',
    icon: MegaphoneIcon,
  },
  {
    name: 'Customer Retention',
    description:
      'Handwritten letters can improve customer retention rates by showing customers that they are valued and appreciated. According to a study by the United States Postal Service, customers who receive handwritten notes are more likely to be loyal to a brand than those who do not. This increased loyalty can lead to higher customer lifetime value and better ROI for the business.',
    icon: ArrowPathRoundedSquareIcon,
  },
]
const pricingFeatures = [
  'No Contracts',
  'No Subscriptions',
  'No Commitments',
  'No Complications',
]
const features = [
  {
    name: 'Personalization Options',
    description:
      'Create a unique and memorable letter that represents their brand and message. You can select from a range of templates, or create your own letter from scratch.',
    icon: UsersIcon,
  },
  {
    name: 'Professional Handwriting',
    description:
      'Maintain a personal touch and emotional connection, while also ensuring that the letter is easy to read and understand.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Quality Control',
    description:
      'We make sure all letters meet the highest standards of quality and accuracy. This includes checking for spelling and grammar errors.',
    icon: HandThumbUpIcon,
  },
  {
    name: 'Fast Turnaround Time',
    description:
      'We ensure that customers receive a timely and relevant message. All letters will be put in the mail within 48 hours of being received.',
    icon: HeartIcon,
  },
  {
    name: 'Excellent Customer Support',
    description:
      'We  provide excellent customer support, with responsive and knowledgeable representatives who can answer any questions or concerns.',
    icon: UserGroupIcon,
  },
  {
    name: 'Bulk Import Feature',
    description:
      'We offer bulk import feature via CSV which allows you to easily upload a large number of customer addresses and information. You can also be able to review and edit the imported data.',
    icon: InboxArrowDownIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  return (
    <div className="bg-white">
      <header className='fixed bg-white   z-50 w-full '>
        <Popover className="relative bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between p-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">ReallyHandWritten</span>
                <Image
                  className="h-12 w-auto sm:h-12"
                  src="/assets/rhw-logo.png"
                  width="500"
                  height="500"
                  alt=""
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-900">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">


              <a href="#integrations" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Integrations
              </a>




              <a href="#pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </a>
              <a href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Features
              </a>
              <a href="#about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About Us
              </a>
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Login
              </Link>
              <Link
                href="/signup"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-900 from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                    <Image
                  className="h-12 w-auto sm:h-12"
                  src="/assets/rhw-logo.png"
                  width="500"
                  height="500"
                  alt=""
                />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-900">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#integrations" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Integrations
                    </a>
                    <a href="#pricing" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Pricing
                    </a>
                    <a href="#features" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      Features
                    </a>
                    <a href="#about" className="text-base font-medium text-gray-900 hover:text-gray-700">
                      About Us
                    </a>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/signup"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-900 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-900"
                    >
                      Sign Up
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?
                      <Link href="/login" className="text-gray-900">
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>

      <main>
        {/* Hero section */}
        <div className="bg-white">
          <div className="relative pt-32 isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
            <div className=" md:block lg:flex mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-20 lg:px-8">
              <div className="px-6 lg:px-0 lg:pt-4">
                <div className="mx-auto max-w-2xl">
                  <div className="max-w-lg">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Send Heartfelt Handwritten Letters
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      We understand the importance of personal connection in business. Thats why we've made it our mission to help businesses like yours create a lasting impression with your customers through the power of handwritten letters.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                      <Link
                        href="/signup"
                        className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
              <div >
                <Image className='max-[730px]:pt-8' src="/assets/powered-by-humans-2.png" alt="me" width="640" height="640" />

              </div>

            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
          </div>
        </div>



        {/* Analytics */}



        <div className="bg-gray-400/5  sm:py-32">
          <div className=" rounded-md  mx-auto max-w-7xl pt-8 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Facts you cannot ignore.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Benefits of handwritten letters for businesses.
                </p>
              </div>
              <dl className="mt-16 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col  p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div id='integrations' className="relative bg-white">
      <div className="mx-auto  max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-12 pb-12 sm:pb-24 lg:col-span-7 lg:px-0 lg:pt-48 lg:pb-56 xl:col-span-6">
          <div className="mx-auto lg:mt-24 md:mt-2 max-w-2xl lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Integrations
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
            Our Zapier integration connects our handwritten letter-sending service to over 2,000 web applications, allowing clients to set up custom workflows that automate handwritten letter sending based on triggers. The integration is easy to set up and fully customizable, providing a powerful tool for saving time while maintaining a personal touch with customers.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
        <Image
              src="/assets/integrations.png"
              alt=""
              height="1024"
              width="1024"
              className="mt-6  w-full max-w-lg rounded-2xl object-cover sm:w-full md:w-full md:mx:auto sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-6"
            />
        </div>
      </div>
    </div>



        {/* Alternating Feature Sections */}



        <div className="bg-white py-24 mt-32 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Connect with Customers on a Deeper Level
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-20 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {mainFeatures.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-lg font-semibold leading-7 text-gray-900">
                      <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-900">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            
          </div>
        </div>


    <div id='pricing' className="bg-white py-16 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Affordable Pricing, Authentic Sentiments</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          We believe that personal touch should not be limited to big budgets. That's why we offer cost-effective pricing plan for our handwritten letter service. The pricing is designed to fit the budgets without breaking the bank.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Experience the Unmatched Connection</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
            Simplify Your Pricing Woes - One Affordable Plan for Handwritten Letters
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-red-900">We make it easy</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {pricingFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-red-900" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Per Card</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$4.47</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <Link
                  href="/signup"
                  className="mt-10 block w-full rounded-md bg-red-900 px-12 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



        {/* Feature Section */}


        <div id='features' className="bg-white py-24 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Personalization with a Pen
              </h2>
              <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-red-900">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-1 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        {/* About us */}
    <div id='about' className="relative bg-white">
      <div className="mx-auto  max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-10 pb-12 sm:pb-18 lg:col-span-7 lg:px-0 lg:pt-32 lg:pb-56 xl:col-span-6">
          <div className="mx-auto lg:mt-24 md:mt-2 max-w-2xl lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About Us
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
            Powered by humans, not robots. Really Handwritten was created by the Weiss sisters out of Tampa, FL. The sisters, Micaela, Melanie and Meredith, all happened to be pregnant at the same time and were to be stay at home moms. Eager to continue to work while still spending valuable time with their newborns, Really Handwritten was born. Since then, the sisters have grown to help several businesses retain more clients, gain more referrals, and increase client retention through the power of handwritten notes.
            </p>
            
          </div>
        </div>
        <div className="relative lg:col-span-6 lg:-mr-8 md:w-full  xl:inset-0 xl:left-1/3 xl:mr-0">
        <Image
              src="/assets/Weiss_Sisters.jpg"
              alt=""
              height="1024"
              width="1024"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:w-full md:w-full md:mx:auto sm:mt-6 lg:mt-6 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
        </div>
      </div>
    </div>


        {/* CTA Section */}
        <div className="bg-gray-50">
          <div className="mx-auto max-w-4xl pt-24 py-12 mt-10 px-6 sm:py-8 sm:pt-16  lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="-mb-1 block bg-red-900 bg-clip-text pb-1 text-transparent">
                Get in touch or create an account.
              </span>
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get In Touch <span aria-hidden="true">→</span>
          </a>
          <Link
            href="/signup"
            className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
          >
            Get started
          </Link>
          
        </div>
          
          </div>
        </div>
      </main>

      <footer className="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 lg:pt-24">
          
          <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
              &copy; 2023 Really Handwritten. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
