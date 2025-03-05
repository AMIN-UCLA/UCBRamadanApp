"use client";

import { useState, useEffect } from "react";
import scheduleData from "@/data/schedule.json";

interface EventListProps {
    date: Date;
}

interface Event {
    type: "taraweeh" | "iftaar" | "Jumaa" | "other";
    time: string;
    location?: string;
    details?: string;
    name?: string;
    organization?: string;
    link?: string;
    linkText?: string;
    jummah_order?: number;
}

export default function EventList({ date }: EventListProps) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const dateString = date.toISOString().split("T")[0];
        const dayEvents =
            (scheduleData as Record<string, Event[]>)[dateString] || [];
        setEvents(dayEvents);
    }, [date]);

    console.log(events)


    // return (
    //     <div>
    //         <h3 className="text-lg md:text-xl font-semibold mb-2">Events</h3>
    //         {events.length === 0 ? (
    //             <p className="text-sm md:text-base">
    //                 No events scheduled for this day.
    //             </p>
    //         ) : (
    //             <ul className="space-y-2 md:space-y-4">
    //                 {events.map((event, index) => (
    //                     <li
    //                         key={index}
    //                         className="border-b pb-2 text-sm md:text-base"
    //                     >
    //                         <div className="font-semibold">
    //                             {event.type === "other"
    //                                 ? typeof event.name === undefined
    //                                     ? "Other Event"
    //                                     : event.name
    //                                 : event.type.charAt(0).toUpperCase() +
    //                                   event.type.slice(1)}
    //                         </div>
    //                         {event.type !== "iftaar" && (
    //                             <div>
    //                                 <span className="inline-block w-20">
    //                                     Time:
    //                                 </span>{" "}
    //                                 {event.time}
    //                             </div>
    //                         )}
    //                         {event.location && (
    //                           <div>
    //                             <span className="inline-block w-20">
    //                               Location:
    //                             </span>{" "}
    //                             {event.location}
    //                           </div>
    //                         )}
    //                         {event.details && (
    //                             <div>
    //                                 <span className="inline-block w-20">
    //                                     Details:
    //                                 </span>{" "}
    //                                 {event.details}
    //                             </div>
    //                         )}
    //                         {event.link && (
    //                             <div>
    //                                 <span className="inline-block w-20">
    //                                     Link:
    //                                 </span>{" "}
    //                                 <a
    //                                     href={event.link}
    //                                     target="_blank"
    //                                     rel="noopener noreferrer"
    //                                     className="text-blue-600 underline"
    //                                 >
    //                                     {event.linkText || "Register"}
    //                                 </a>
    //                             </div>
    //                         )}
    //                         {event.type === "other" && (
    //                             <div>
    //                                 <span className="inline-block w-20">
    //                                     Org:
    //                                 </span>{" "}
    //                                 {event.organization}
    //                             </div>
    //                         )}
    //                     </li>
    //                 ))}
    //             </ul>
    //         )}
    //     </div>
    // );
    return (
        <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Events</h3>
            {events.length === 0 ? (
                <p className="text-sm md:text-base">
                    No events scheduled for this day.
                </p>
            ) : (
                <ul className="space-y-2"> {/* Reduced vertical spacing */}
                    {events.map((event, index) => (
                        <li key={index} className="border-b pb-2">
                            {/* Event Type Title */}
                            <div className="font-semibold text-lg">
                                {event.type === "other"
                                    ? event.name ?? "Other Event"
                                    : event.type === "Jumaa" && event.jummah_order
                                    ? event.type.charAt(0).toUpperCase() + event.type.slice(1) + ' ' + event.jummah_order
                                    : event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </div>

    
                            {/* Flexbox for better label-value alignment */}
                            <div className="mt-1 space-y-1 text-sm md:text-base">
                                <div className="flex">
                                    <span className="w-20">Time:</span>
                                    <span className="flex-1">{event.time}</span>
                                </div>
    
                                {event.location && (
                                    <div className="flex">
                                        <span className="w-20">Location:</span>
                                        <span className="flex-1">{event.location}</span>
                                    </div>
                                )}
    
                                {event.details && (
                                    <div className="flex">
                                        <span className="w-20">Details:</span>
                                        <span className="flex-1">{event.details}</span>
                                    </div>
                                )}
    
                                {event.organization && (
                                    <div className="flex">
                                        <span className="w-20">Host:</span>
                                        <span className="flex-1">{event.organization}</span>
                                    </div>
                                )}
    
                                {event.link && (
                                    <div className="flex">
                                        <span className="w-20">Link:</span>
                                        <a
                                            href={event.link.startsWith("http") ? event.link : `https://${event.link}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline flex-1"
                                        >
                                            {event.linkText || "RSVP"}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
                
}
