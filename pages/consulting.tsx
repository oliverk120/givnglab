import {
    Box,
    Heading,
    VStack,
    Select,
    Button,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const Consulting = () => {
    const [homeCountry, setHomeCountry] = useState("");
    const [jurisdictionCountry, setJurisdictionCountry] = useState("");
    const [numPeople, setNumPeople] = useState(1);
    const [priceEstimate, setPriceEstimate] = useState(0);
  
    const countries = [
      "China",
      "India",
      "United States",
      "Indonesia",
      "Pakistan",
      "Brazil",
      "Nigeria",
      "Bangladesh",
      "Russia",
      "Mexico",
    ];
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Sample logic for calculating the price estimate
      const juniorRate = 10;
      const seniorRate = 100;
      const proportionSenior = 0.5;
      const proportionJunior = 0.5;
  
      // Calculate the weighted average rate based on the proportion of senior and junior consultants
      const averageRate = (seniorRate * proportionSenior) + (juniorRate * proportionJunior);
      const estimate = numPeople * averageRate;
      setPriceEstimate(estimate);
    };
  
    return (
      <Box maxW="container.xl" mx="auto" p={4} textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          Consulting Firm
        </Heading>
  
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} width="300px" mx="auto">
            {/* Home Country Selection */}
            <FormControl isRequired>
              <Select
                placeholder="Home Country"
                value={homeCountry}
                onChange={(e) => setHomeCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </FormControl>
  
            {/* Jurisdiction Country Selection */}
            <FormControl isRequired>
              <Select
                placeholder="Jurisdiction Country"
                value={jurisdictionCountry}
                onChange={(e) => setJurisdictionCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </FormControl>
  
            {/* Number of People Input */}
            <FormControl isRequired>
              <FormLabel>Select number of people you need</FormLabel>
              <NumberInput
                min={1}
                value={numPeople}
                onChange={(value) => setNumPeople(Number(value))}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
  
            {/* Submit Button */}
            <Button colorScheme="teal" type="submit">
              Get Price Estimate
            </Button>
          </VStack>
        </form>
  
        {/* Display Price Estimate */}
        {priceEstimate > 0 && (
          <Text fontSize="xl" mt={6}>
            Price Estimate: ${priceEstimate.toFixed(2)}/hour
</Text>
)}
</Box>
);
};

export default Consulting;
  