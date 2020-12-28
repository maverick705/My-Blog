import React, {useEffect, useState} from 'react';
import sanityClient from "../Client.js"

export default function Projects() {
    const [projectData, setProjectData] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
        }`).then((data) => setProjectData(data))
        .catch(console.error);
    }, [])

    return (
        <main className="bg-gray-600 min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center">Ken's Projects</h1>
                <h2 className="text-lg text-white flex justify-center mb-12">Check out the project links below if you'd like to learn more.</h2>
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData && projectData.map((project, index) => (
                    <article className="relative rounded-lg shadow-xl bg-white p-16">
                        <h3 className="text-gray-500 text-3xl font-bold mb-2 hover:text-orange-700">
                            <a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer">{project.title}</a>
                        </h3>
                        <div className="text-gray-500 text-xs space-x-4">
                            <span>
                                <strong className="font-bold">Finished on </strong>:{" "}
                                {new Date(project.date).toLocaleDateString()}
                            </span>
                            <span>
                                <strong className="font-bold">Company</strong>:{" "}
                                {project.place}
                            </span>
                            <span>
                                <strong className="font-bold">Type</strong>:{" "}
                                {project.projectType}
                            </span>
                            <p className="my-6 text-lg text-gray-700 leading relaxed">{project.description}</p>
                            <a href={project.link} rel="noopener noreferrer" target="_blank" className="text-orange-500 font-bold hover:underline hover:text-orange-500 text-xl">
                                View The Project
                            </a>
                            
                        </div>
                    </article>
                    ))}
                </section>
            </section>
        </main>
    )
}