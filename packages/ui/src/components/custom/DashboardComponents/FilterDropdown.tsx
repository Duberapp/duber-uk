import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../ui/dropdown-menu";
import { FilterItem } from "global-constants";
import { ChevronDown, XCircleIcon } from "lucide-react";

interface FilterDropdownProps {
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items?: FilterItem[];
  dropdownLabel?: string;
}

export default function FilterDropdown({
  dropdownLabel,
  items,
  placeholder,
  setValue,
  value,
}: FilterDropdownProps) {
  const [label, setLabel] = useState<string>(placeholder!);

  useEffect(() => {
    if (value === "") {
      setLabel(placeholder!);
      return;
    }

    const filteredItem = items
      ? items.filter((item) => item.slug === value)
      : null;

    if (filteredItem && filteredItem.length > 0) {
      setLabel(filteredItem[0].title);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="rounded-full flex items-center gap-x-3"
          >
            <span>{label}</span>

            <ChevronDown className="text-slate-500 w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{dropdownLabel}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            {items &&
              items?.length > 0 &&
              items.map((item) => (
                <DropdownMenuRadioItem
                  key={item.slug}
                  value={item.slug}
                  className="cursor-pointer"
                >
                  <span>{item.title}</span>
                </DropdownMenuRadioItem>
              ))}
            {value && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem
                  value={""}
                  className="flex items-center gap-x-1"
                >
                  <XCircleIcon className="text-destructive w-3 h-3" />
                  <p className="text-destructive">Clear Filter</p>
                </DropdownMenuRadioItem>
              </>
            )}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
