#include <iostream>
#include <vector>
using namespace std;

// Problem: How to find all pairs on integer array whose sum is equal to given number?

void print2DVector(const std::vector<std::vector<int>>& matrix) {
    for (const auto& row : matrix) {       // For each row
        for (int val : row) {              // For each element in that row
            std::cout << val << " ";
        }
        std::cout << "\n";                 // New line after each row
    }
}
vector<vector<int>> findSumPair(vector<int> v,int total){

    vector<vector<int>> result;
    for(int i=0;i<v.size();i++){
        vector<int> temp;
        temp.push_back(v[i]);
        int sum=v[i];
        if(sum == total){
            result.push_back(temp);
            continue;
        }

        for(int j=i+1;j<v.size();j++){
            int it = v[j];
            if(sum ==total){
                result.push_back(temp);
                break;
            }else if((sum +it)<=total){
                temp.push_back(it);
                sum=sum+it;
            }

        }
    }

    return result;

}

int main() {


    vector<int> arr={11,1,1,1,1,3,5,3,5,2,52,6,21,35,5,3,21,3,1,1};
    int sum=0;
    cout<<"Enter sum value: ";
    cin>>sum;

    vector<vector<int>> result = findSumPair(arr,sum);


    print2DVector(result);


    return 0;
}
