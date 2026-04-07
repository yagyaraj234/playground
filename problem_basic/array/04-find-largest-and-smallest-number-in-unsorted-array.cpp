#include <climits>
#include <iostream>
#include <vector>
#include <random>
using namespace std;

// Problem: How to find largest and smallest number in unsorted array?
std::vector<int> generateRandomNumbers(int count) {
    std::vector<int> result;
    result.reserve(count); // Optional: Pre-allocate memory for efficiency

    // Setup random number generation (Modern C++ style)
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(1, count); // Range [1, count]

    for (int i = 0; i < count; ++i) {
        result.push_back(dis(gen));
    }

    return result; // Efficiently moved, not copied
}



struct Result {
    int largest;
    int smallest;
};

Result findLargestSmallest(vector<int> v){

    if (v.empty()) return {0, 0}; // Handle empty case

        int largest = v[0];
        int smallest = v[0];

    for(int i=0;i<v.size();i++){

        int item = v[i];
        if(item > largest){
            largest=item;
        }
        if(item < smallest){
            smallest=item;
        }
    }

    return {largest,smallest};

}
int main() {

    vector<int> input = generateRandomNumbers(932);

    Result output = findLargestSmallest(input);

    cout<<"Largest: "<<output.largest<<endl<<"Smallest: "<<output.smallest<<endl;


    return 0;
}
