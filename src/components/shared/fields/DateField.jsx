"use client";

import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";

const DateField = ({
    control,
    errors,
    field,
}) => {
    return (
        <div className="space-y-2">
            <Label>Date Needed By</Label>

            <Controller
                control={control}
                name={field[0]}
                rules={{
                    required: "Please select a required date.",
                }}
                render={({ field: controllerField }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                    "h-14 w-full justify-start rounded-2xl border-border/60 bg-background/50 px-5 text-left font-normal shadow-sm",
                                    !controllerField.value &&
                                    "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />

                                {controllerField.value ? (
                                    format(
                                        controllerField.value,
                                        "PPP"
                                    )
                                ) : (
                                    <span>Select a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            className="w-auto p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={controllerField.value}
                                onSelect={controllerField.onChange}
                                disabled={(date) =>
                                    date < new Date()
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />

            <FormErrors
                errors={errors}
                field={field[0]}
            />
        </div>
    );
};

export default DateField;