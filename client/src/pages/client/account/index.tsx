import { Input, LayoutSpaces } from "@/components";
import Head from "next/head";

export default function AccountPage() {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {



  }


  return (
    <>
      <Head>
        <title>Mi cuenta | Spaces</title>
      </Head>
      <LayoutSpaces type="account">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div id="step1" className="flex w-full flex-col gap-4">
            <div className="mt-2 flex items-center gap-x-3">
              <svg
                className="h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
            <div className="col-span-4">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex w-80 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <Input
              type="text"
              name="firstName"
              label="Nombre"
              placeholder="Nombre"
              className="max-w-md"
            />
            <Input
              type="text"
              name="lastName"
              label="Apellidos"
              placeholder="Apellidos"
              className="max-w-md"
            />
            <Input
              type="text"
              name="userName"
              label="User name"
              placeholder="User name"
              className="max-w-md"
            />
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Email"
              className="max-w-md"
            />
            <Input
              type="password"
              name="password"
              label="Change password"
              placeholder="new password"
              className="max-w-md"
            />

            <button type="submit" className="primaryButton w-40">
              enviar cambios
            </button>
          </div>
        </form>
      </LayoutSpaces>
    </>
  );
}
