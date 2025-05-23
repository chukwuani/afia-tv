// app/page.tsx
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { obuzoFormSchema, ObuzoFormValues } from "@/lib/validations/obuzo-form"; // You might need to add shadcn toast for notifications
import { toast } from "sonner";

export default function ObuzoForm() {
  const form = useForm<ObuzoFormValues>({
    resolver: zodResolver(obuzoFormSchema),
    defaultValues: {
      biz_name: "",
      biz_start_date: "",
      biz_reg_status: undefined, // undefined for radio groups
      biz_reg_type: undefined,
      biz_state: undefined,
      biz_employee: undefined,
      biz_turnover: undefined,
      biz_type: "",
      biz_advert_need: "",
      biz_advert_goals: "",
      biz_advert_truth: undefined,
      biz_advert_method: "",
      biz_measure: "",
      biz_contact_number: "",
      biz_contact_email: "",
      biz_compliance: undefined,
      biz_certify: undefined,
      biz_declaration: false,
    },
  });

  async function onSubmit(data: ObuzoFormValues) {
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset(); // Reset form after successful submission
      } else {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description: errorData.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 mb-8 max-w-3xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 bg-white rounded-lg shadow-md"
        >
          <div className="my-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              Obuzo Advertising Grant Application
            </h1>
          </div>

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            A. Business Information
          </h3>

          <FormField
            control={form.control}
            name="biz_name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  What is the name of your business?
                </FormLabel>
                <FormControl>
                  <Input placeholder="Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_start_date"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  When did you start your business?
                </FormLabel>
                <FormControl>
                  <Input placeholder="Start Date / Year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_reg_status"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Is your business registered?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" id="biz-reg-yes" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz-reg-yes"
                        className="font-normal text-base cursor-pointer"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="no" id="biz-reg-no" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz-reg-no"
                        className="font-normal text-base cursor-pointer"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_reg_type"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  What type of registration does your business have?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
                  >
                    {["cac", "sta", "coc", "mur", "tur", "nrr"].map((type) => (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <RadioGroupItem value={type} id={type} />
                        </FormControl>
                        <FormLabel
                          htmlFor={type}
                          className="font-normal text-base cursor-pointer"
                        >
                          {type === "cac" && "CAC"}
                          {type === "sta" && "State Trade Agency"}
                          {type === "coc" && "Chamber of Commerce"}
                          {type === "mur" && "Market Union"}
                          {type === "tur" && "Trade Union"}
                          {type === "nrr" && "Not Registered"}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_state"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Please specify the state where your business is operating in
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
                  >
                    {["abia", "anambra", "ebonyi", "enugu", "imo"].map(
                      (state) => (
                        <FormItem
                          key={state}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={state}
                              id={`biz-state-${state}`}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`biz-state-${state}`}
                            className="font-normal text-base cursor-pointer"
                          >
                            {state.charAt(0).toUpperCase() + state.slice(1)}
                          </FormLabel>
                        </FormItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            B. Business Size
          </h3>

          <FormField
            control={form.control}
            name="biz_employee"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  How many employees does your business currently have?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
                  >
                    {["1 - 10", "11 - 50", "51 - 100", "100+"].map(
                      (employees, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={employees}
                              id={`biz_employee-${index}`}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`biz_employee-${index}`}
                            className="font-normal text-base cursor-pointer"
                          >
                            {employees}
                          </FormLabel>
                        </FormItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            C. Turnover
          </h3>

          <FormField
            control={form.control}
            name="biz_turnover"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Did your business make a profit of over ten million naira
                  (₦10,000,000) in the last financial year?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" id="biz_turnover-yes" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_turnover-yes"
                        className="font-normal text-base cursor-pointer"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="no" id="biz_turnover-no" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_turnover-no"
                        className="font-normal text-base cursor-pointer"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            D. Business Type
          </h3>

          <FormField
            control={form.control}
            name="biz_type"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Describe your type of business
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="(e.g., Retail, Manufacturing, Agriculture, Services, etc.)"
                    className="h-24 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            E. Advertising Needs
          </h3>

          <FormField
            control={form.control}
            name="biz_advert_need"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Briefly describe why your business needs the advertising
                  grant.
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    className="h-24 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_advert_goals"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  What are your primary advertising goals?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="(e.g., Increase brand awareness, Drive sales, Launch a new product, etc.)"
                    className="h-24 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            F. Current Advertising Strategies
          </h3>

          <FormField
            control={form.control}
            name="biz_advert_truth"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Have you advertised in the past?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" id="biz_advert-yes" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_advert-yes"
                        className="font-normal text-base cursor-pointer"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="no" id="biz_advert-no" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_advert-no"
                        className="font-normal text-base cursor-pointer"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_advert_method"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  What did you use to advertise?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(e.g., social media, Print media, Radio, Television, etc.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            G. Impact Measurement
          </h3>

          <FormField
            control={form.control}
            name="biz_measure"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  How will you measure the success of the advertising grant on
                  your business?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="(e.g., Increase in sales, Website traffic, social media engagement, etc.)"
                    className="h-24 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            H. Contact Details
          </h3>

          <FormField
            control={form.control}
            name="biz_contact_number"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Phone Number{" "}
                  <span className="text-orange-600">
                    (Please provide your Eleven Digit Phone Number)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="080XXXXXXXX" {...field} maxLength={11} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_contact_email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Contact Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            I. Compliance and Certification
          </h3>

          <FormField
            control={form.control}
            name="biz_compliance"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Do you agree to provide periodic updates and reports on the
                  use of the grant and its impact on your business?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" id="biz_compliance-yes" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_compliance-yes"
                        className="font-normal text-base cursor-pointer"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="no" id="biz_compliance-no" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_compliance-no"
                        className="font-normal text-base cursor-pointer"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biz_certify"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-lg font-bold mb-2">
                  Do you certify that all information provided in this
                  application is accurate and truthful to the best of your
                  knowledge?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" id="biz_certify-yes" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_certify-yes"
                        className="font-normal text-base cursor-pointer"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="no" id="biz_certify-no" />
                      </FormControl>
                      <FormLabel
                        htmlFor="biz_certify-no"
                        className="font-normal text-base cursor-pointer"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8 border-gray-300" />

          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            J. Declaration
          </h3>

          <FormField
            control={form.control}
            name="biz_declaration"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mb-8">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="biz_declaration"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel
                    htmlFor="biz_declaration"
                    className="font-bold cursor-pointer"
                  >
                    I declare that the information provided in this application
                    is true and correct, and I understand that any false
                    information may lead to disqualification from receiving the
                    grant
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="mb-8">
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
