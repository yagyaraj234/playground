#include <iostream>
#include <algorithm>
#include <vector>
#include <random>
#include <print>

using namespace std;

std::vector<int> generateRandomNumbers(int count) {
    std::vector<int> result;
    result.reserve(count); // Optional: Pre-allocate memory for efficiency

    // Setup random number generation (Modern C++ style)
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(1, 100); // Range [1, 100]

    for (int i = 0; i < count; ++i) {
        result.push_back(dis(gen));
    }

    return result; // Efficiently moved, not copied
}


bool isNumberExist(const std::vector<int> &v, int num) {
    // std::find returns an iterator to the element, or v.end() if not found
    return std::find(v.begin(), v.end(), num) != v.end();
}

// Problem: How to check if array contains a number in cpp?

int main() {

    vector<int> v = generateRandomNumbers(100);

    int num1,num2,num3=0;
    cin>>num1>>num2>>num3;


    cout<<"Number: "<<num1<<" "<<isNumberExist(v, num1)<<endl;
    cout<<"Number: "<<num2<<" "<<isNumberExist(v, num2)<<endl;
     cout<<"Number: "<<num3<<" "<<isNumberExist(v, num3)<<endl;
      cout<<"Number 102: "<<isNumberExist(v, 102)<<endl;
    return 0;
}
