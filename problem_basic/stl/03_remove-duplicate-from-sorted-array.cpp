#include<iostream>

using namespace std;



//  use two pointer approach 
vector<int> removeDuplicates(vector<int> nums){

    int i = 0;

    for (int j = 1; j < nums.size();j++){
        if (nums[j] != nums[i]){
            i++;
            nums[i] = nums[j];
        }
    }

    nums.resize(i + 1);

    return nums;
}

int main() {
    vector<int> arr = {0,0,1,1,1,2,2,3,3,4};
    vector<int> res = removeDuplicates(arr);

    for (int x : res) cout << x << " ";
    cout << endl;
}
